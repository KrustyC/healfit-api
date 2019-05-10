import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface IRecipeCreateInput {
  input: {
    title: string;
    servings: number;
    description: string;
    totalTime: number;
    category: {
      id: string;
      name: string;
    };
    level: {
      id: string;
      name: string;
    };
    ingredients: [
      {
        id: number;
        name: string;
        measurement: {
          label: string;
          value: number;
        };
        quantity: string;
      }
    ];
    method: string;
    picture: string;
    calories: number;
    carbohydrates: number;
    fiber: number;
    protein: number;
    fat: number;
  };
}

export interface IRecipeEditInput {
  input: {
    slug: string;
    title: string;
    servings: number;
    description: string;
    totalTime: number;
    category: {
      id: string;
      name: string;
    };
    level: {
      id: string;
      name: string;
    };
    ingredients: [
      {
        id: number;
        name: string;
        measurement: {
          label: string;
          value: number;
        };
        quantity: string;
      }
    ];
    method: string;
    picture: string;
    calories: number;
    fiber: number;
    carbohydrates: number;
    protein: number;
    fat: number;
  };
}

export interface IRecipeRateInput {
  input: {
    slug: string;
    rate: number;
  };
}

export interface IRecipeLikeInput {
  input: {
    slug: string;
  };
}

export interface IRecipe extends Document {
  _id: IObjectId;
  title: string;
  slug: string;
  servings: number;
  totalTime: number;
  description: string;
  category: {
    id: string;
    name: string;
  };
  level: {
    id: string;
    name: string;
  };
  ingredients: [
    {
      id: number;
      name: string;
      measurement: {
        label: string;
        value: number;
      };
      quantity: string;
    }
  ];
  method: string;
  picture: string;
  calories: number;
  carbohydrates: number;
  fiber: number;
  protein: number;
  fat: number;
}


export interface IRecipeRating extends Document {
  _id: IObjectId;
  recipeId: IObjectId;
  userId: IObjectId;
  rating: number;
}
