import Ingredient from '@context/ingredient';
import { ILimitSkipInput, IObjectId } from 'types/global';
import {
  IIngredient,
  IIngredientCreateInput,
  IIngredientEditInput,
} from 'types/ingredient';

interface IDeleteData {
  id: IObjectId;
}

interface INameInput {
  name: string;
}

export default {
  Mutation: {
    addIngredient: async (
      _: object,
      data: IIngredientCreateInput
    ): Promise<IIngredient> => Ingredient.create(data),
    deleteIngredient: async (
      _: object,
      { id }: { id: IObjectId }
    ): Promise<boolean> => Ingredient.delete(id),
    updateIngredient: async (
      _: object,
      data: IIngredientEditInput
    ): Promise<boolean> => Ingredient.update(data),
  },
  Query: {
    ingredient: async (
      _: object,
      { id }: { id: IObjectId }
    ): Promise<IIngredient> => Ingredient.show(id),
    ingredients: async (
      _: object,
      args: ILimitSkipInput
    ): Promise<IIngredient[]> => Ingredient.list(args),
    ingredientsByName: async (
      _: object,
      args: INameInput
    ): Promise<IIngredient[]> => Ingredient.searchByName(args.name),
  },
};
