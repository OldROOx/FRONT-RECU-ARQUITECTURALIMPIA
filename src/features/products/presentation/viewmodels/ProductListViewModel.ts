import { makeAutoObservable, runInAction } from "mobx";
import { ProductDTO } from "../../data/models/ProductDTO";
import { ListProductsUseCase } from "../../domain/ListProductsUseCase";
import { DeleteProductUseCase } from "../../domain/DeleteProductUseCase";
import { GetProductsByUserIdUseCase } from "../../domain/GetProductsByUserIdUseCase";
import { UserDTO } from "../../../users/data/models/UserDTO";
import { ListUsersUseCase } from "../../../users/domain/ListUsersUseCase";

export class ProductListViewModel {
    products: ProductDTO[] = [];
    users: UserDTO[] = [];
    selectedUserId: number | null = null;
    loading: boolean = false;
    error: string | null = null;

    private listProductsUseCase: ListProductsUseCase;
    private deleteProductUseCase: DeleteProductUseCase;
    private getProductsByUserIdUseCase: GetProductsByUserIdUseCase;
    private listUsersUseCase: ListUsersUseCase;

    constructor() {
        makeAutoObservable(this);
        this.listProductsUseCase = new ListProductsUseCase();
        this.deleteProductUseCase = new DeleteProductUseCase();
        this.getProductsByUserIdUseCase = new GetProductsByUserIdUseCase();
        this.listUsersUseCase = new ListUsersUseCase();
    }

    async loadProducts() {
        this.loading = true;
        this.error = null;

        try {
            let products;
            if (this.selectedUserId !== null) {
                products = await this.getProductsByUserIdUseCase.execute(this.selectedUserId);
            } else {
                products = await this.listProductsUseCase.execute();
            }

            runInAction(() => {
                this.products = products;
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar los productos";
                this.loading = false;
            });
        }
    }

    async loadUsers() {
        try {
            const users = await this.listUsersUseCase.execute();
            runInAction(() => {
                this.users = users;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar los usuarios";
            });
        }
    }

    async deleteProduct(id: number) {
        this.loading = true;
        this.error = null;

        try {
            const success = await this.deleteProductUseCase.execute(id);
            runInAction(() => {
                if (success) {
                    this.products = this.products.filter(product => product.id !== id);
                } else {
                    this.error = "No se pudo eliminar el producto";
                }
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al eliminar el producto";
                this.loading = false;
            });
        }
    }

    setSelectedUserId(userId: number | null) {
        this.selectedUserId = userId;
        this.loadProducts();
    }
}