module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
  testRegex: 'api-e2e/app\\.e2e-spec\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
};
