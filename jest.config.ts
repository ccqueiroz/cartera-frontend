import nextJest from "next/jest";
import { resolve } from "path";

const root = resolve(__dirname);

const createJestConfig = nextJest({
  dir: root,
});

const configJest = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts",
    "!**/*.gateway.ts",
    "!**/*.dto.ts",
    "!**/src/**/*.stories.tsx",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  rootDir: root,
};

export default createJestConfig(configJest);
