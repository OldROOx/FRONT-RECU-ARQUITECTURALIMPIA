import { makeAutoObservable, runInAction } from "mobx";
import { ProductDTO } from "../../data/models/ProductDTO";
import { ListProductsUseCase } from "../../domain/ListProductsUseCase";
import { DeleteProductUseCase } from "../../domain/DeleteProductUseCase";
import { GetProductsByUserIdUseCase } from "../../domain/GetProductsByUserIdUseCase";
import { UserDTO } from "../../../users/data/models/UserDTO";
import { ListUsersUseCase } from "../../../users/domain/ListUsersUseCase";

export class ProductListViewModel {
    private static instance: ProductListViewModel;

    products: ProductDTO[] = [];
    users: UserDTO[] = [];
    selectedUserId: number | null = null;
    loading: boolean = false;
    error: string | null = null;
    dataLoaded: boolean = false;

    private listProductsUseCase: ListProductsUseCase;
    private deleteProductUseCase: DeleteProductUseCase;
    private getProductsByUserIdUseCase: GetProductsByUserIdUseCase;
    private listUsersUseCase: ListUsersUseCase;

    private constructor() {
        makeAutoObservable(this);
        this.listProductsUseCase = new ListProductsUseCase();
        this.deleteProductUseCase = new DeleteProductUseCase();
        this.getProductsByUserIdUseCase = new GetProductsByUserIdUseCase();
        this.listUsersUseCase = new ListUsersUseCase();
    }

    public static getInstance(): ProductListViewModel {
        if (!ProductListViewModel.instance) {
            ProductListViewModel.instance = new ProductListViewModel();
        }
        return ProductListViewModel.instance;
    }


    async loadInitialData(): Promise<void> {
        if (this.users.length === 0) {
            await this.loadUsers();
        }


        if (!this.dataLoaded || this.products.length === 0) {
            await this.loadProducts();
        }
    }

    async loadProducts(): Promise<void> {

        if (this.dataLoaded && this.selectedUserId === null && this.products.length > 0) return;

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
                this.dataLoaded = true;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar los productos";
                this.loading = false;
            });
        }
    }

    async loadUsers(): Promise<void> {
        if (this.users.length > 0) return;

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

    async deleteProduct(id: number): Promise<void> {
        try {
            const success = await this.deleteProductUseCase.execute(id);
            runInAction(() => {
                if (success) {
                    // Actualizamos localmente sin mostrar loading
                    this.products = this.products.filter(product => product.id !== id);
                } else {
                    this.error = "No se pudo eliminar el producto";
                }
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al eliminar el producto";
            });
        }
    }

    setSelectedUserId(userId: number | null): void {
        if (this.selectedUserId === userId) return;

        this.selectedUserId = userId;
        this.dataLoaded = false; // Marcar que necesitamos recargar con el filtro
        this.loadProducts();
    }


    updateProductLocally(updatedProduct: ProductDTO): void {
        this.products = this.products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
    }


    addProductLocally(newProduct: ProductDTO): void {
        this.products = [...this.products, newProduct];
    }


    setUsers(users: UserDTO[]): void {
        this.users = users;
    }
}