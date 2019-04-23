import ValueObject from './valueobject';

const TYPES = {
  'ic-1': 'Dairy',
  'ic-2': 'Vegetables',
  'ic-3': 'Poultry',
};
class IngredientsCategories extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new IngredientsCategories();
