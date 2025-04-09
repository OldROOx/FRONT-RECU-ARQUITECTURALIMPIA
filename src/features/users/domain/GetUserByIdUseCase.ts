import { UserDTO } from "../data/models/UserDTO";
import { UserRepository } from "../data/repository/UserRepository";

export class GetUserByIdUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id: number): Promise<UserDTO | null> {
        return await this.userRepository.getUserById(id);
    }
}