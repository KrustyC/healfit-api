import { expect } from 'chai';
import 'mocha';
import MealPlanContext from '../index';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = MealPlanContext.hello();
    expect(result).to.equal('Hello world!');
  });
});
