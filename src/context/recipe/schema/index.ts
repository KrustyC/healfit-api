import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IRecipe } from 'types/recipe';

const recipeSchema = new mongoose.Schema(
  {
    calories: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    category: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
    createdBy: { _id: false, type: 'ObjectId', ref: 'account' },
    description: { type: String, required: true },
    fat: { type: Number, required: true },
    fiber: { type: Number, required: true },
    ingredients: [
      {
        id: { _id: false, type: 'ObjectId', ref: 'ingredient' },
        measurement: {
          id: { type: String, required: true },
          name: { type: String, required: true },
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    level: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
    likedBy: [{ _id: false, type: 'ObjectId', ref: 'account' }],
    method: { type: String, required: true },
    picture: { type: String, required: true },
    protein: { type: Number, required: true },
    servings: { type: Number, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    totalTime: { type: Number, required: true },
  },
  { timestamps: true }
);

recipeSchema.index({ name: 'text' });

export const Recipe: Model<IRecipe> = mongoose.model<IRecipe>(
  'Recipe',
  recipeSchema
);
