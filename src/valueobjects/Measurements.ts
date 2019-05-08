import ValueObject from './valueobject';

const TYPES = {
  'm-1': 'Grams',
  'm-2': 'Oz',
  'm-3': 'Teaspoon',
  'm-4': 'Tablespoon',
  'm-5': 'Cup',
  'm-6': 'Pint',
  'm-7': 'Litre',
  'm-8': 'Unit',
};

class Measurements extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new Measurements();
