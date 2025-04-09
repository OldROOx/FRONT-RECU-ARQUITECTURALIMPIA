import { ProductDTO } from "../data/models/ProductDTO";
import { ProductRepository } from "../data/repository/ProductRepository";

export class GetProductByIdUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(id: number): Promise<ProductDTO | null> {
        return await this.productRepository.getProductById(id);
    }
}