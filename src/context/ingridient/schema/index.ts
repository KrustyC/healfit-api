import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IIngridient } from 'types/ingridient';

const ingridientSchema = new mongoose.Schema(
  {
    calories: Number,
    createdBy: { _id: false, type: 'ObjectId', ref: 'account' },
    name: { type: String, required: true },
    nutrients: [
      {
        id: { _id: false, type: 'ObjectId', ref: 'nutrient' },
        name: String,
        value: Number,
      },
    ],
    // caegory: {}
  },
  { timestamps: true }
);

export const Ingridient: Model<IIngridient> = mongoose.model<IIngridient>(
  'Ingridient',
  ingridientSchema
);
