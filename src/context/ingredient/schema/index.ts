import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IIngredient } from 'types/ingredient';

const ingredientSchema = new mongoose.Schema(
  {
    // allergens: [{ _id: false, type: 'ObjectId', ref: 'allergens' }],
    calories: Number,
    createdBy: { _id: false, type: 'ObjectId', ref: 'account' },
    name: { type: String, required: true },
    nutrients: {
      carbohydrate: {
        fiber: Number,
        sugar: Number,
      },
      cholesterol: Number,
      fat: {
        monounsaturated: Number,
        polyunsaturated: Number,
        saturated: Number,
      },
      potassium: Number,
      protein: Number,
      sodium: Number,
    },
  },
  { timestamps: true }
);

ingredientSchema.index({ name: 'text' });

export const Ingredient: Model<IIngredient> = mongoose.model<IIngredient>(
  'Ingredient',
  ingredientSchema
);
