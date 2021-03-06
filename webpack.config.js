const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: `${__dirname}/src/thumb-capture.tsx`,
  output: {
    filename: process.env.NODE_ENV === "development" ? "rp-thumb-capture.js" : "rp-thumb-capture.min.js",
    path: __dirname,
    library: "RPThumbCapture",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },

  devtool: false,

  externals: {
    "ractive-player": {
      commonjs: "ractive-player",
      commonjs2: "ractive-player",
      amd: "ractive-player",
      root: "RactivePlayer"
    },
    "react": {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    }
  },

  mode: process.env.NODE_ENV,

  module: {
    rules: [
     {
        test: /\.[jt]sx?$/,
        loader: "ts-loader"
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          safari10: true
        }
      })
    ],
    emitOnErrors: true
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: () => require("fs").readFileSync("./LICENSE", {encoding: "utf8"})
    })
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  }
};
