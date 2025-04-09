import { ProductDTO } from "../models/ProductDTO";
import { Product } from "../models/Product";

export class ProductRepository {
    private apiUrl = "http://localhost:8080/api/products";

    async getProducts(): Promise<ProductDTO[]> {
        const response = await fetch(this.apiUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.map((item: any) =>
            new ProductDTO(item.id, item.name, item.price, item.user_id)
        );
    }

    async getProductsByUserId(userId: number): Promise<ProductDTO[]> {
        const response = await fetch(`${this.apiUrl}?user_id=${userId}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.map((item: any) =>
            new ProductDTO(item.id, item.name, item.price, item.user_id)
        );
    }

    async getProductById(id: number): Promise<ProductDTO | null> {
        const response = await fetch(`${this.apiUrl}/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return new ProductDTO(data.id, data.name, data.price, data.user_id);
    }

    async createProduct(product: Product): Promise<ProductDTO> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                user_id: product.userId
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return new ProductDTO(data.id, data.name, data.price, data.user_id);
    }

    async updateProduct(id: number, product: Product): Promise<ProductDTO> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                user_id: product.userId
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return new ProductDTO(data.id, data.name, data.price, data.user_id);
    }

    async deleteProduct(id: number): Promise<boolean> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE'
        });

        return response.ok;
    }
}