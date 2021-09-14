const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.js");
const resolveApp = require('./paths');

const prodConfig = {
  mode: "production",
  devtool: "none",
  output: {
    filename: "js/[name].[chunkhash:5].js", // js 输出到 dist/js/xxx
    publicPath: "./", // 公用的公共路径 /
    path: resolveApp('./dist'), // 输出目录为 dist
  },
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
