const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.js");

const prodConfig = {
  mode: "production",
  devtool: "none",
  optimization: {
    splitChunks: {
      //分包配置
      chunks: "all", // 对同步和异步的代码均采用分包
      cacheGroups: {
        styles: {
          minSize: 0,
          test: /\.css$/,
          minChunks: 2,
        },
      },
    },
  },
};
module.exports = merge(baseConfig, prodConfig);
