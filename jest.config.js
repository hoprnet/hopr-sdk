/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    ['./test-reporter.js', { threshold: 2 * 60 * 1000 }] // Customize the threshold as needed
  ]
};
