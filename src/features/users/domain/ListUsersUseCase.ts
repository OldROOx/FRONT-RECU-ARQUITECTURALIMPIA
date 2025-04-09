import { UserDTO } from "../data/models/UserDTO";
import { UserRepository } from "../data/repository/UserRepository";

export class ListUsersUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(): Promise<UserDTO[]> {
        return await this.userRepository.getUsers();
    }
}