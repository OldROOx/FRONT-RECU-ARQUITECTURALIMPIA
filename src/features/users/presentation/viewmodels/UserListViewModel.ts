import { makeAutoObservable, runInAction } from "mobx";
import { UserDTO } from "../../data/models/UserDTO";
import { ListUsersUseCase } from "../../domain/ListUsersUseCase";
import { DeleteUserUseCase } from "../../domain/DeleteUserUseCase";

export class UserListViewModel {
    users: UserDTO[] = [];
    loading: boolean = false;
    error: string | null = null;

    private listUsersUseCase: ListUsersUseCase;
    private deleteUserUseCase: DeleteUserUseCase;

    constructor() {
        makeAutoObservable(this);
        this.listUsersUseCase = new ListUsersUseCase();
        this.deleteUserUseCase = new DeleteUserUseCase();
    }

    async loadUsers() {
        this.loading = true;
        this.error = null;

        try {
            const users = await this.listUsersUseCase.execute();
            runInAction(() => {
                this.users = users;
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar los usuarios";
                this.loading = false;
            });
        }
    }

    async deleteUser(id: number) {
        this.loading = true;
        this.error = null;

        try {
            const success = await this.deleteUserUseCase.execute(id);
            runInAction(() => {
                if (success) {
                    this.users = this.users.filter(user => user.id !== id);
                } else {
                    this.error = "No se pudo eliminar el usuario";
                }
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al eliminar el usuario";
                this.loading = false;
            });
        }
    }
}