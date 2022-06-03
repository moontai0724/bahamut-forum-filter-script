const { readFileSync } = require("fs");
const path = require("path");
const Webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.css$/,
        type: "asset/source",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.user.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new Webpack.BannerPlugin({
      banner: readFileSync("./HEADER.js", "utf8"),
      raw: true,
    }),
  ],
};
