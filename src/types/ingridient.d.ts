import mongoose, { Schema, Document, Model } from 'mongoose';
import { ObjectId } from './global';

interface CategoryId extends ObjectId {}

export interface Nutrient {
  id: ObjectId;
  name: string;
  value: number;
}

export interface IngridientCreateInput {
  input: {
    name: string;
    category: CategoryId;
    calories: number;
    nutrients: [{
      nutrient: Nutrient;
      value: Number;
    }]
  };
}

export interface IngridientEditInput {
  input: {
    id: ObjectId;
    name: string;
    category: CategoryId;
    calories: number;
    nutrients: [{
      nutrient: Nutrient;
      value: Number;
    }]
  };
}

export interface IIngridient extends Document {
  _id: ObjectId;
  name: string;
  calories: Number;
  nutrients: [{
    nutrient: Nutrient;
    value: Number;
  }]
}

export interface INutrient extends Document {
  _id: ObjectId;
  name: string;
  value: number;
}
