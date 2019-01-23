import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface INutrient {
  id: IObjectId;
  name: string;
  value: number;
}

export interface IIngridientCreateInput {
  input: {
    name: string;
    category: IObjectId;
    calories: number;
    nutrients: [
      {
        nutrient: INutrient;
        value: number;
      }
    ];
  };
}

export interface IIngridientEditInput {
  input: {
    id: IObjectId;
    name: string;
    category: IObjectId;
    calories: number;
    nutrients: [
      {
        nutrient: INutrient;
        value: number;
      }
    ];
  };
}

export interface IIngridient extends Document {
  _id: IObjectId;
  name: string;
  calories: number;
  nutrients: [
    {
      nutrient: INutrient;
      value: number;
    }
  ];
}

export interface INutrient extends Document {
  _id: IObjectId;
  name: string;
  value: number;
}
