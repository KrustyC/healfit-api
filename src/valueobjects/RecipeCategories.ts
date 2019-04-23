import ValueObject from './valueobject';

const TYPES = {
  'rc-1': 'Breakfast',
  'rc-2': 'Brunch',
  'rc-3': 'Lunch',
  'rc-4': 'Soups',
  'rc-5': 'Shake',
  'rc-6': 'Fish',
  'rc-7': 'Vegetarian',
  'rc-8': 'Vegan',
  'rc-9': 'Salads',
};

class RecipeCategories extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new RecipeCategories();
