module.exports = {
  preset: "react-native",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig-test.json",
      babelConfig: true
    }
  }
};
