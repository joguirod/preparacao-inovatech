import { passwordProvider, PasswordProvider } from "../../infra/auth/password.provider";
import { AppDataSource } from "../../infra/database/data-source";
import { userRepository, UserRepository } from "../../infra/repositories/user.repository";
import { CreateUserDto, SimpleUserDto } from "../dto/user.dto";

export class UserService {
    constructor(
        private repo: UserRepository = userRepository,
        private hashProvider: PasswordProvider = passwordProvider,
    ) {}

    async create(data: CreateUserDto) {
        const exists = await this.findByEmail(data.email);
        if (exists) {
            throw new Error("Email already used");
        }

        const user = await this.repo.create({
            name: data.name,
            email: data.email, 
            password: this.hashProvider.hash(data.password)
        });

        const { password, ...safeUser } = user;
        
        return safeUser;
    }
    
    async findAll(): Promise<SimpleUserDto[]> {
        const users = await this.repo.findAll();
        return users.map(user => new SimpleUserDto({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }));
    }

    async findById(id: string): Promise<SimpleUserDto> {
        const user = await this.repo.findById(id)
        if (!user) throw new Error(`User with id ${id} not found`);
        return new SimpleUserDto({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        });
    }

    async findByEmail(email: string) {
        const user = await this.repo.findByEmail(email);
        return user;
    }

    async delete(id: string) {
        const user = await this.repo.findById(id);
        if (!user) throw new Error(`User with ${id} not found`);
        await this.repo.delete(user);
    }
};

export const userService = new UserService(); 