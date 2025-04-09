import { UserDTO } from "../models/UserDTO";
import { User } from "../models/User";

export class UserRepository {
    private apiUrl = "http://localhost:8080/api/users";

    async getUsers(): Promise<UserDTO[]> {
        const response = await fetch(this.apiUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.map((item: any) =>
            new UserDTO(item.id, item.name, item.email, item.products)
        );
    }

    async getUserById(id: number): Promise<UserDTO | null> {
        const response = await fetch(`${this.apiUrl}/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return new UserDTO(data.id, data.name, data.email, data.products);
    }

    async createUser(user: User): Promise<UserDTO> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return new UserDTO(data.id, data.name, data.email);
    }

    async updateUser(id: number, user: User): Promise<UserDTO> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return new UserDTO(data.id, data.name, data.email);
    }

    async deleteUser(id: number): Promise<boolean> {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE'
        });

        return response.ok;
    }
}