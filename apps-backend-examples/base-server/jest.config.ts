import type { Config } from 'jest';

const config: Config = {
  testTimeout: 100000,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@BE-common(|/.*)$': '<rootDir>/../../libs-backend/common/src/$1',
    '^@schema(|/.*)$': '<rootDir>/../../shared-schema/base/src/$1',
  },
  workerThreads: true,
};

export default config;
