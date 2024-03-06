/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  collectCoverage: false,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    /* '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
        useESM: true,
      },
    ],
    '.mjs': [
      'ts-jest',
      {
        // ts-jest configuration goes here
        useESM: true,
      },
    ], */
    "^.+\\.(mt|t|cj|j|mj)s$": [
      "ts-jest",
      {
        "useESM": true
      }
    ]
  },
};