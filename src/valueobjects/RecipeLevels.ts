import ValueObject from './valueobject';

const TYPES = {
  'rl-1': 'Beginner',
  'rl-2': 'Intermidiate',
  'rl-3': 'Chef',
};

class RecipeLevels extends ValueObject {
  constructor() {
    super(TYPES);
  }
}

export default new RecipeLevels();
