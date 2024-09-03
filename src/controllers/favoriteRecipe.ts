import { Request, Response } from 'express';
import FavoriteRecipe from '../models/favoriteRecipe'; // Adjust the path as needed
import { STATUS_CODE } from '../utils/respose';
import { LoggedInUser } from '../utils/interface';

export const addFavoriteRecipe = async (req: LoggedInUser, res: Response) => {
  try {
    const { recipeId, recipeName, recipeImage, recipeSummary, ingredients } = req.body;
    const userId = req?.user?._id; // Assuming you are using a middleware to attach the authenticated user to the request

    // Check if the recipe is already in the user's favorites
    const alreadyFavorite = await FavoriteRecipe.findOne({ user: userId, recipeId });
    if (alreadyFavorite) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Recipe is already in your favorites!',
      });
    }

    // Create and save the favorite recipe
    const favoriteRecipe = new FavoriteRecipe({
      user: userId,
      recipeId,
      recipeName,
      recipeImage,
      recipeSummary,
      ingredients,
    });

    await favoriteRecipe.save();

    return res.status(STATUS_CODE.OK).json({
      message: 'Recipe added to favorites successfully!',
      data: favoriteRecipe,
    });
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      message: 'Error adding favorite recipe',
      error,
    });
  }
};

export const listFavoriteRecipes = async (req: LoggedInUser, res: Response) => {
    try {
      const userId = req?.user?._id; // Assuming you are using a middleware to attach the authenticated user to the request
  
      // Fetch all favorite recipes for the authenticated user
      const favoriteRecipes = await FavoriteRecipe.find({ user: userId });
  
    //   if (!favoriteRecipes.length) {
    //     return res.status(STATUS_CODE.NOT_FOUND).json({
    //       message: 'No favorite recipes found!',
    //     });
    //   }
  
      return res.status(STATUS_CODE.OK).json({
        message: 'Favorite recipes retrieved successfully!',
        data: favoriteRecipes,
      });
    } catch (error) {
      return res.status(STATUS_CODE.SERVER_ERROR).json({
        message: 'Error retrieving favorite recipes',
        error,
      });
    }
  };
