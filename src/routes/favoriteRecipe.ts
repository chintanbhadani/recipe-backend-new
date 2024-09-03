import express from 'express';
import { addFavoriteRecipe, listFavoriteRecipes } from '../controllers/favoriteRecipe';
import { verifyUserLogin } from '../middleware/auth';

const favoriteRouter = express.Router();

favoriteRouter.post('/', verifyUserLogin, addFavoriteRecipe); // Route to add favorite recipe
favoriteRouter.get('/', verifyUserLogin, listFavoriteRecipes); // Route to list favorite recipes

export default favoriteRouter;
