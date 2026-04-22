import { User } from "../../domain/entities/user";
import { AppDataSource } from "../database/data-source";

export class UserRepository {
    private repo = AppDataSource.getRepository(User);

    findAll(): Promise<User[]> {
        return this.repo.find();    
    }

    findById(id: string): Promise<User | null>{
        return this.repo.findOneBy({id});
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repo.findOneBy({email});
    }

    create(data: Partial<User>): Promise<User> {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    delete(user: User) {
        this.repo.remove(user)
    }
};

export const userRepository = new UserRepository();