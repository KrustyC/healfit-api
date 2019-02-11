import ValueObject from './valueobject';

const TYPES = {
  1: 'Grams',
  2: 'Oz',
  3: 'Teaspoon',
  4: 'Tablespoon',
  5: 'Cup',
  6: 'Pint',
  7: 'Litre',
};

class Measurements extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new Measurements();
