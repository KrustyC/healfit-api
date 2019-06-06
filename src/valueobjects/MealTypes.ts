import ValueObject from './valueobject';

const TYPES = {
  'mt-1': 'Meal',
  'mt-2': 'Workout',
};

class MealTypes extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new MealTypes();
