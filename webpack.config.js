const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/entryPoint.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "entryPoint.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [new GasPlugin()],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
