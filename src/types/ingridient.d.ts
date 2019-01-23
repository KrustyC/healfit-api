import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface INutrient extends Document {
  id: IObjectId;
  name: string;
  subNutrients: [
    {
      name: string
    }
  ]
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

export interface INutrientCreateInput {
  input: {
    name: string;
    subNutrients: [
      {
        name: string;
      }
    ];
  }
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
