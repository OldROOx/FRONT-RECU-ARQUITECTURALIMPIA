import { ProductRepository } from "../data/repository/ProductRepository";

export class DeleteProductUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(id: number): Promise<boolean> {
        return await this.productRepository.deleteProduct(id);
    }
}