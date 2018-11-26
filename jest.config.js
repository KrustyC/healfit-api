module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|js)?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^env(.*)$': '<rootDir>/src/env/$1',
    '^context(.*)$': '<rootDir>/src/context/$1',
  },
};
