import { Router } from 'express';
import authRouter from './auth';
import favoriteRouter from './favoriteRecipe';

const appRoutes = Router();

appRoutes.use('/auth', authRouter);
appRoutes.use('/favorites', favoriteRouter);

export default appRoutes;
