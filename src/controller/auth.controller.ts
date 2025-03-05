import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

export class AuthController {
    constructor(private authService: AuthService) {}

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await this.authService.registerUser(name, email, password);
            res.status(201).json({ id: user.id, name: user.name, email: user.email });
        } catch (error) {
            res.status(400).json({ error: 'Registration failed' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.loginUser(email, password);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }
    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.authService.getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
}
