/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/documentation', '<rootDir>/dist'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
