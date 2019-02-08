import ValueObject from './valueobject';

const TYPES = {
  1: 'Dairy',
  2: 'Vegetables',
  3: 'Poultry',
};

class IngridientsCategories extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new IngridientsCategories();
