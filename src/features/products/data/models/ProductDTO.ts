export class ProductDTO {
    id: number
    name: string
    price: number
    userId: number

    constructor(id: number, name: string, price: number, userId: number) {
        this.id = id
        this.name = name
        this.price = price
        this.userId = userId
    }
}