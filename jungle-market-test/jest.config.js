module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/node_modules/', '<rootDir>/src/'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
