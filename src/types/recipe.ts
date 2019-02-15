import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface IRecipeCreateInput {
  input: {
    title: string;
    servings: number;
    totalTime: number;
    category: {
      id: number;
      name: string;
    };
    level: {
      id: number;
      name: string;
    };
    ingridients: [
      {
        id: number;
        name: string;
        measurement: {
          label: string;
          value: number;
        };
        quantity: number;
      }
    ];
    method: object;
    picture: string;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
  };
}

export interface IRecipeEditInput {
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

export interface IRecipe extends Document {
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
