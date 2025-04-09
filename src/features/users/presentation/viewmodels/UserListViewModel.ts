import { makeAutoObservable, runInAction } from "mobx";
import { UserDTO } from "../../data/models/UserDTO";
import { ListUsersUseCase } from "../../domain/ListUsersUseCase";
import { DeleteUserUseCase } from "../../domain/DeleteUserUseCase";

export class UserListViewModel {
    private static instance: UserListViewModel;

    users: UserDTO[] = [];
    loading: boolean = false;
    error: string | null = null;
    dataLoaded: boolean = false;

    private listUsersUseCase: ListUsersUseCase;
    private deleteUserUseCase: DeleteUserUseCase;

    private constructor() {
        makeAutoObservable(this);
        this.listUsersUseCase = new ListUsersUseCase();
        this.deleteUserUseCase = new DeleteUserUseCase();
    }

    public static getInstance(): UserListViewModel {
        if (!UserListViewModel.instance) {
            UserListViewModel.instance = new UserListViewModel();
        }
        return UserListViewModel.instance;
    }

    async loadUsers() {
        if (this.dataLoaded) return;

        this.loading = true;
        this.error = null;

        try {
            const users = await this.listUsersUseCase.execute();
            runInAction(() => {
                this.users = users;
                this.loading = false;
                this.dataLoaded = true;
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
                    // Actualizamos localmente sin recargar
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


    updateUserLocally(updatedUser: UserDTO) {
        this.users = this.users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        );
    }


    addUserLocally(newUser: UserDTO) {
        this.users = [...this.users, newUser];
    }
}