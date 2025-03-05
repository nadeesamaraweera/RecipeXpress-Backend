import { Router } from 'express';
import { UserRepository } from '../repository/user.repository';
import { AuthService } from '../service/auth.service';
import {AuthController} from "../controller/auth.controller";

const router = Router();
const authController = new AuthController(new AuthService(new UserRepository()));

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;