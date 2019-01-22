import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IIngridient } from 'types/ingridient';

const ingridientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    calories: Number,
    nutrients: [{
        id: { _id: false, type: 'ObjectId', ref: 'nutrient' },
        name: String,
        value: Number,
    }],
    createdBy: { _id: false, type: 'ObjectId', ref: 'account' },
    // caegory: {}
  },
  { timestamps: true }
);

export const Ingridient: Model<IIngridient> = mongoose.model<IIngridient>(
  'Ingridient',
  ingridientSchema
);
