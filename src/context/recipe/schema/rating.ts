import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IRecipeRating } from 'types/recipe';

const recipeRatingSchema = new mongoose.Schema(
  {
    rating: Number,
    recipeId: { _id: false, type: 'ObjectId', ref: 'recipe' },
    userId: { _id: false, type: 'ObjectId', ref: 'account' },
  },
  { timestamps: true }
);

export const RecipeRating: Model<IRecipeRating> = mongoose.model<IRecipeRating>(
  'RecipeRating',
  recipeRatingSchema
);
