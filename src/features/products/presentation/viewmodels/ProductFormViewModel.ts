import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../../data/models/Product";
import { ProductDTO } from "../../data/models/ProductDTO";
import { CreateProductUseCase } from "../../domain/CreateProductUseCase";
import { UpdateProductUseCase } from "../../domain/UpdateProductUseCase";
import { GetProductByIdUseCase } from "../../domain/GetProductByIdUseCase";
import { UserDTO } from "../../../users/data/models/UserDTO";
import { ListUsersUseCase } from "../../../users/domain/ListUsersUseCase";

export class ProductFormViewModel {
    id: number | null = null;
    name: string = '';
    price: number = 0;
    userId: number = 0;
    users: UserDTO[] = [];
    loading: boolean = false;
    error: string | null = null;
    success: boolean = false;

    private createProductUseCase: CreateProductUseCase;
    private updateProductUseCase: UpdateProductUseCase;
    private getProductByIdUseCase: GetProductByIdUseCase;
    private listUsersUseCase: ListUsersUseCase;

    constructor() {
        makeAutoObservable(this);
        this.createProductUseCase = new CreateProductUseCase();
        this.updateProductUseCase = new UpdateProductUseCase();
        this.getProductByIdUseCase = new GetProductByIdUseCase();
        this.listUsersUseCase = new ListUsersUseCase();
    }

    reset() {
        this.id = null;
        this.name = '';
        this.price = 0;
        this.userId = 0;
        this.error = null;
        this.success = false;
    }

    async loadUsers() {
        try {
            const users = await this.listUsersUseCase.execute();
            runInAction(() => {
                this.users = users;
                if (users.length > 0 && this.userId === 0) {
                    this.userId = users[0].id;
                }
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar los usuarios";
            });
        }
    }

    async loadProduct(id: number) {
        this.loading = true;
        this.error = null;

        try {
            const product = await this.getProductByIdUseCase.execute(id);
            runInAction(() => {
                if (product) {
                    this.id = product.id;
                    this.name = product.name;
                    this.price = product.price;
                    this.userId = product.userId;
                } else {
                    this.error = `No se encontró el producto con ID ${id}`;
                }
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar el producto";
                this.loading = false;
            });
        }
    }

    async saveProduct() {
        if (!this.name || this.price <= 0 || this.userId <= 0) {
            this.error = "Todos los campos son requeridos y el precio debe ser mayor que cero";
            return;
        }

        this.loading = true;
        this.error = null;
        this.success = false;

        const product = new Product(this.name, this.price, this.userId);

        try {
            let savedProduct: ProductDTO;

            if (this.id === null) {
                // Create new product
                savedProduct = await this.createProductUseCase.execute(product);
            } else {
                // Update existing product
                savedProduct = await this.updateProductUseCase.execute(this.id, product);
            }

            runInAction(() => {
                this.id = savedProduct.id;
                this.success = true;
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al guardar el producto";
                this.loading = false;
            });
        }
    }

    setName(name: string) {
        this.name = name;
    }

    setPrice(price: string) {
        this.price = parseFloat(price) || 0;
    }

    setUserId(userId: string) {
        this.userId = parseInt(userId) || 0;
    }
}