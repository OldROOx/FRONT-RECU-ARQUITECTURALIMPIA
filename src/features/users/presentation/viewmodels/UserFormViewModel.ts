import { makeAutoObservable, runInAction } from "mobx";
import { User } from "../../data/models/User";
import { UserDTO } from "../../data/models/UserDTO";
import { CreateUserUseCase } from "../../domain/CreateUserUseCase";
import { UpdateUserUseCase } from "../../domain/UpdateUserUseCase";
import { GetUserByIdUseCase } from "../../domain/GetUserByIdUseCase";

export class UserFormViewModel {
    id: number | null = null;
    name: string = '';
    email: string = '';
    loading: boolean = false;
    error: string | null = null;
    success: boolean = false;

    private createUserUseCase: CreateUserUseCase;
    private updateUserUseCase: UpdateUserUseCase;
    private getUserByIdUseCase: GetUserByIdUseCase;

    constructor() {
        makeAutoObservable(this);
        this.createUserUseCase = new CreateUserUseCase();
        this.updateUserUseCase = new UpdateUserUseCase();
        this.getUserByIdUseCase = new GetUserByIdUseCase();
    }

    reset() {
        this.id = null;
        this.name = '';
        this.email = '';
        this.error = null;
        this.success = false;
    }

    async loadUser(id: number) {
        this.loading = true;
        this.error = null;

        try {
            const user = await this.getUserByIdUseCase.execute(id);
            runInAction(() => {
                if (user) {
                    this.id = user.id;
                    this.name = user.name;
                    this.email = user.email;
                } else {
                    this.error = `No se encontró el usuario con ID ${id}`;
                }
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al cargar el usuario";
                this.loading = false;
            });
        }
    }

    async saveUser() {
        if (!this.name || !this.email) {
            this.error = "Nombre y correo electrónico son requeridos";
            return;
        }

        this.loading = true;
        this.error = null;
        this.success = false;

        const user = new User(this.name, this.email);

        try {
            let savedUser: UserDTO;

            if (this.id === null) {
                // Create new user
                savedUser = await this.createUserUseCase.execute(user);
            } else {
                // Update existing user
                savedUser = await this.updateUserUseCase.execute(this.id, user);
            }

            runInAction(() => {
                this.id = savedUser.id;
                this.success = true;
                this.loading = false;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || "Error al guardar el usuario";
                this.loading = false;
            });
        }
    }

    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }
}