import { ProductDTO } from "../data/models/ProductDTO";
import { ProductRepository } from "../data/repository/ProductRepository";

export class GetProductsByUserIdUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(userId: number): Promise<ProductDTO[]> {
        return await this.productRepository.getProductsByUserId(userId);
    }
}