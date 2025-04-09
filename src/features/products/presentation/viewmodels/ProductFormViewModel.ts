import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../../data/models/Product";
import { ProductDTO } from "../../data/models/ProductDTO";
import { CreateProductUseCase } from "../../domain/CreateProductUseCase";
import { UpdateProductUseCase } from "../../domain/UpdateProductUseCase";
import { GetProductByIdUseCase } from "../../domain/GetProductByIdUseCase";
import { UserDTO } from "../../../users/data/models/UserDTO";
import { ListUsersUseCase } from "../../../users/domain/ListUsersUseCase";
import { ProductListViewModel } from "./ProductListViewModel";

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
    private productListViewModel: ProductListViewModel;

    constructor() {
        makeAutoObservable(this);
        this.createProductUseCase = new CreateProductUseCase();
        this.updateProductUseCase = new UpdateProductUseCase();
        this.getProductByIdUseCase = new GetProductByIdUseCase();
        this.listUsersUseCase = new ListUsersUseCase();

        // Usamos la instancia singleton
        this.productListViewModel = ProductListViewModel.getInstance();
    }

    reset(): void {
        this.id = null;
        this.name = '';
        this.price = 0;
        this.userId = this.users.length > 0 ? this.users[0].id : 0;
        this.error = null;
        this.success = false;
    }

    async loadUsers(): Promise<void> {
        try {
            // Intentamos usar los usuarios ya cargados en ListViewModel
            if (this.productListViewModel.users.length > 0) {
                runInAction(() => {
                    this.users = this.productListViewModel.users;
                    if (this.users.length > 0 && this.userId === 0) {
                        this.userId = this.users[0].id;
                    }
                });
                return;
            }

            // Si no hay usuarios cargados, los cargamos
            const users = await this.listUsersUseCase.execute();
            runInAction(() => {
                this.users = users;
                if (users.length > 0 && this.userId === 0) {
                    this.userId = users[0].id;
                }

                // Actualizamos también el listViewModel
                this.productListViewModel.setUsers(users);
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar los usuarios";
            });
        }
    }

    async loadProduct(id: number): Promise<void> {
        this.loading = true;
        this.error = null;

        try {
            // Primero intentamos buscar en los productos cargados
            const cachedProduct = this.productListViewModel.products.find(p => p.id === id);
            if (cachedProduct) {
                runInAction(() => {
                    this.id = cachedProduct.id;
                    this.name = cachedProduct.name;
                    this.price = cachedProduct.price;
                    this.userId = cachedProduct.userId;
                    this.loading = false;
                });
                return;
            }

            // Si no está en caché, cargamos de la API
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

    async saveProduct(): Promise<void> {
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

                // Actualizamos la lista sin refetch
                this.productListViewModel.addProductLocally(savedProduct);
            } else {
                // Update existing product
                savedProduct = await this.updateProductUseCase.execute(this.id, product);

                // Actualizamos la lista sin refetch
                this.productListViewModel.updateProductLocally(savedProduct);
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

    setName(name: string): void {
        this.name = name;
    }

    setPrice(price: string): void {
        this.price = parseFloat(price) || 0;
    }

    setUserId(userId: string): void {
        this.userId = parseInt(userId) || 0;
    }
}