import { UserRepository } from "../data/repository/UserRepository";

export class DeleteUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(id: number): Promise<boolean> {
        return await this.userRepository.deleteUser(id);
    }
}