export class Product {
    name: string
    price: number
    userId: number

    constructor(name: string, price: number, userId: number) {
        this.name = name
        this.price = price
        this.userId = userId
    }
}