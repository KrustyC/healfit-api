import _ from 'lodash';
import bcrypt from 'bcrypt-nodejs';
import mongoose, { Model } from 'mongoose';
import { INutrient } from 'types/ingridient';

const nutrientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

export const Nutrient: Model<INutrient> = mongoose.model<INutrient>(
  'Nutrient',
  nutrientSchema
);
