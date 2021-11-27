module.exports = {
  verbose: true,
  testMatch: ['**/test/**/*.spec.js'],
  collectCoverageFrom: ['**/src/**/*.js'],
  setupFiles: ['./test/init.js'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};
