import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IIngridient } from 'types/ingridient';

const ingridientSchema = new mongoose.Schema(
  {
    // allergens: [{ _id: false, type: 'ObjectId', ref: 'allergens' }],
    calories: Number,
    createdBy: { _id: false, type: 'ObjectId', ref: 'account' },
    name: { type: String, required: true },
    nutrients: {
      carbohydrate: { fiber: Number, sugar: Number },
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

export const Ingridient: Model<IIngridient> = mongoose.model<IIngridient>(
  'Ingridient',
  ingridientSchema
);
