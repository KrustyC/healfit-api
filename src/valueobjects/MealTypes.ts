import ValueObject from './valueobject';

const TYPES = {
  'mt-1': 'Breakfast',
  'mt-2': 'Snack',
  'mt-3': 'Lunch',
  'mt-4': 'Dinner',
};

class MealTypes extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new MealTypes();
