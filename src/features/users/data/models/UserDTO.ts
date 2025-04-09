export class UserDTO {
    id: number
    name: string
    email: string
    products?: any[]

    constructor(id: number, name: string, email: string, products: any[] = []) {
        this.id = id
        this.name = name
        this.email = email
        this.products = products
    }
}