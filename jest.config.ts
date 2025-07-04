import nextJest from "next/jest";
import { resolve } from "path";

const root = resolve(__dirname);

const createJestConfig = nextJest({
  dir: root,
});

const configJest = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/app/**/*.tsx",
    "!src/components/**/*.tsx",
    "!src/ui/**/*.tsx",
    "!**/*.gateway.ts",
    "!**/*.dto.ts",
    "!src/**/*.stories.tsx",
    "!src/**/mock.{ts,tsx}",
    "!src/middleware.ts'",
    "!src/@types/**",
    "!src/constants/**",
    "!src/styles/**",
    "!src/infra/**/index.ts",
    "!src/**/*.style.ts",
    "!src/lib/cn.utils.ts",
    "!src/infra/schemas/**/*.ts",
    "!src/factories/**/*.ts",
    "!src/**/*.constants.ts",
  ],
  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "<rootDir>/src/**/*.test.{ts,tsx}",
    "<rootDir>/src/**/*.spec.{ts,tsx}",
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!(string-width|ansi-regex|strip-ansi|cliui|wrap-ansi|yargs|@cspotcode|@jridgewell)/)",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  rootDir: root,
};

export default createJestConfig(configJest);
