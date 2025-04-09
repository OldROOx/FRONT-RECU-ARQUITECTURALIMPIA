import { Product } from "../data/models/Product";
import { ProductDTO } from "../data/models/ProductDTO";
import { ProductRepository } from "../data/repository/ProductRepository";

export class CreateProductUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(product: Product): Promise<ProductDTO> {
        return await this.productRepository.createProduct(product);
    }
}