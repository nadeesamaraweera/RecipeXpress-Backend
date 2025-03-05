import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repository/user.repository';
import { User } from '../model/user.model';

export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async registerUser(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.createUser({ email, password: hashedPassword });
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        return jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
    }
}