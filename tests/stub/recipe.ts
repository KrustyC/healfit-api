import faker from 'faker';
import _ from 'lodash';
import mongoose from 'mongoose';
import { IObjectId } from '../../src/types/global';
import { IRecipe } from '../../src/types/recipe';

import { RecipeSchema } from '../../src/context/recipe/schema';

const { ObjectId: MongooseObjectId } = mongoose.mongo;

interface IRecipeData {
  _id?: IObjectId;
  title?: string;
  slug?: string;
  servings?: number;
  totalTime?: number;
  description?: string;
  category?: {
    id: string;
    name: string;
  };
  createdBy: IObjectId;
  level?: {
    id: string;
    name: string;
  };
  ingredients?: [
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
  method?: string;
  picture?: string;
  calories?: number;
  carbohydrates?: number;
  fiber?: number;
  protein?: number;
  fat?: number;
}

export function fakeRecipe(data: IRecipeData): IRecipe {
  return new RecipeSchema({
    _id: data._id ? new MongooseObjectId(data._id) : new MongooseObjectId(),
    calories: data.calories || faker.random.number(),
    carbohydrates: data.carbohydrates || faker.random.number(),
    category: data.category || {
      id: 'mt-1', // @TODO add a proper one
      name: 'Brakfast',
    },
    createdBy: data.createdBy,
    description: data.description || faker.lorem.sentence(),
    fat: data.fat || faker.random.number(),
    fiber: data.fiber || faker.random.number(),
    ingredients: data.ingredients || [],
    level: data.category || {
      id: 'mt-1', // @TODO add a proper one
      name: 'Beginner',
    },
    method: data.method || faker.lorem.sentence(),
    picture: data.picture || 'placeholder.png',
    protein: data.protein || faker.random.number(),
    servings: data.servings || faker.random.number(),
    slug: data.slug || faker.lorem.slug(),
    title: data.title || faker.lorem.sentence(),
    totalTime: data.totalTime || faker.random.number(),
  });
}
