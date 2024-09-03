import { Router } from 'express';
import { login, signUp } from '../controllers/auth';
import { validateLogin, validateSignup } from '../validation/auth';

const authRouter = Router();

authRouter.post('/signup', validateSignup, signUp);
authRouter.post('/login', validateLogin, login);

export default authRouter;
