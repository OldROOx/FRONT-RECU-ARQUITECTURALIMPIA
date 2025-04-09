import { User } from "../data/models/User";
import { UserDTO } from "../data/models/UserDTO";
import { UserRepository } from "../data/repository/UserRepository";

export class CreateUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(user: User): Promise<UserDTO> {
        return await this.userRepository.createUser(user);
    }
}