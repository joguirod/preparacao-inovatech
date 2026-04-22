import bcrypt from "bcryptjs";

export class PasswordProvider {
    hash(payload: string): string {
        return bcrypt.hashSync(payload, 10);
    } 

    compare(payload: string, hashed: string): boolean {
        return bcrypt.compareSync(payload, hashed)
    }
};

export const passwordProvider = new PasswordProvider();