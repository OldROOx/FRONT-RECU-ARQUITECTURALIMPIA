import { Product } from "../data/models/Product";
import { ProductDTO } from "../data/models/ProductDTO";
import { ProductRepository } from "../data/repository/ProductRepository";

export class UpdateProductUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(id: number, product: Product): Promise<ProductDTO> {
        return await this.productRepository.updateProduct(id, product);
    }
}