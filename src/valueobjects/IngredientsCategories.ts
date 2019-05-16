import ValueObject from './valueobject';

const TYPES = {
  'ic-1': 'Dairy',
  'ic-2': 'Vegetables',
  'ic-3': 'Poultry',
  'ic-4': 'Meat',
  'ic-5': 'Soft Drink',
  'ic-6': 'Alcoholic Drink',
  'ic-7': 'Condiment',
  'ic-8': 'Flour',
  'ic-9': 'Grain',
};
class IngredientsCategories extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new IngredientsCategories();
