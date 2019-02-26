import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface IIngredientCreateInput {
  input: {
    name: string;
    category: IObjectId;
    calories: number;
    nutrients: {
      carbohydrate: { fiber: number; sugar: number };
      cholesterol: number;
      fat: {
        monounsaturated: number;
        polyunsaturated: number;
        saturated: number;
      };
      potassium: number;
      protein: number;
      sodium: number;
    };
  };
}

export interface IIngredientEditInput {
  input: {
    id: IObjectId;
    name: string;
    category: IObjectId;
    calories: number;
    nutrients: {
      carbohydrate: { fiber: number; sugar: number };
      cholesterol: number;
      fat: {
        monounsaturated: number;
        polyunsaturated: number;
        saturated: number;
      };
      potassium: number;
      protein: number;
      sodium: number;
    };
  };
}

export interface IIngredient extends Document {
  _id: IObjectId;
  name: string;
  calories: number;
  nutrients: {
    carbohydrate: { fiber: number; sugar: number };
    cholesterol: number;
    fat: {
      monounsaturated: number;
      polyunsaturated: number;
      saturated: number;
    };
    potassium: number;
    protein: number;
    sodium: number;
  };
}
