module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts"],
    modulePathIgnorePatterns: ["<rootDir>/dist/"]
};
