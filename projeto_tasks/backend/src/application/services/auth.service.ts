import { jwtProvider, JwtProvider } from "../../infra/auth/jwt.provider";
import { passwordProvider, PasswordProvider } from "../../infra/auth/password.provider";
import { LoginDto } from "../dto/auth.dto";
import { CreateUserDto } from "../dto/user.dto";
import { userService, UserService } from "./user.service";

export class AuthService {
    constructor(
        private users: UserService = userService,
        private hashProvider: PasswordProvider = passwordProvider,
        private tokenProvider: JwtProvider = jwtProvider 
    ) {}

    async register(data: CreateUserDto) {
        const user = await this.users.create(data);

        return { user };
    }

    async login(data: LoginDto) {
        const user = await this.users.findByEmail(data.email);
        if (!user) throw new Error("Incorrect email/password");

        const passwordMatch = this.hashProvider.compare(data.password, user.password)
        if (!passwordMatch) throw new Error("Incorrect email/password");

        const token = this.tokenProvider.generate({
            userId: user.id,
            email: user.email
        });

        return { token };
    }
}

export const authService = new AuthService();