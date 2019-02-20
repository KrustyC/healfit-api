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
    method: string;
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
    method: string;
    picture: string;
    calories: number;
    carbohydrates: number;
    protein: number;
    fat: number;
  };
}

export interface IRecipe extends Document {
  _id: IObjectId;
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
  method: string;
  picture: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
}
