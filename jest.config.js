const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  rootDir: '.',
  globals: {
    'ts-jest': {
      disableSourceMapSupport: true,
    }
  },
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  verbose: true,
  setupFiles: ['<rootDir>/scripts/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */ ),
  },
  roots: ['./src'],
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'node'
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/scripts/fileTransformer.js',
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
  ],
  testRegex: '.*\\.test\\.(ts|tsx)$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageThreshold: {
    global: {
      'statements': 80,
      'branches': 80,
      'functions': 80,
      'lines': 80
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    './src/**/*.{ts,tsx}',
    '!./**/node_modules/**'
  ],
};
