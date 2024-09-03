import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for a favorite recipe
interface IFavoriteRecipe extends Document {
  user: mongoose.Schema.Types.ObjectId; // Reference to the user who favorited the recipe
  recipeId: string;                     // The recipe ID from the external API (e.g., Spoonacular)
  recipeName: string;                   // Name of the recipe
  recipeImage: string;                  // URL of the recipe image
  recipeSummary: string;                // Short summary of the recipe
  ingredients: string[];                // List of ingredients
}

const FavoriteRecipeSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    // Reference to the User model
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
  recipeImage: {
    type: String,
    required: true,
  },
  recipeSummary: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const FavoriteRecipe = mongoose.model<IFavoriteRecipe>('FavoriteRecipe', FavoriteRecipeSchema);

export default FavoriteRecipe;
