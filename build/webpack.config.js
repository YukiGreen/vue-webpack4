const resolveApp = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除 dist 目录
const CopyPlugin = require("copy-webpack-plugin"); // 处理静态资源
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 处理模板页面
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包css文件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// webpack的基本配置
module.exports = {
  context: resolveApp('./'),
  entry: "./src/main.js", // 获取入口配置
  output: {
    filename: "js/[name].[chunkhash:5].js", // js 输出到 dist/js/xxx
    publicPath: "./", // 公用的公共路径 /
    path: resolveApp('./dist'), // 输出目录为 dist
  },
  resolve: {
    extensions: [".js", ".vue", ".json"], // 当输入一个没有后缀的文件名时，解析为这些后缀来查找文件
    alias: {
      "@": resolveApp('./src'), // 别名 @ = src目录
      _: __dirname, // 别名 _ = 工程根目录
    },
  },
  stats: {
    colors: true, // 打包时使用不同的颜色区分信息
    modules: false, // 打包时不显示具体模块信息
    entrypoints: false, // 打包时不显示入口模块信息
    children: false, // 打包时不显示子模块信息
  },
  module: {
    rules: [
      {
        // 各种图片、字体文件，均交给 url-loader 处理
        test: /\.(png)|(gif)|(jpg)|(svg)|(bmp)|(eot)|(woff)|(ttf)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "static/[name].[hash:5].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      { test: /\.js$/, use: "babel-loader" },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 应用 清除输出目录 插件
    new CopyPlugin({
      // 应用 复制文件 插件
      patterns: [
        {
          from: resolveApp('./public'), // 将public目录中的所有文件
          to: "./", // 复制到 输出目录 的根目录
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 全局的上下文在这里也生效，直接相对于根目录来写相对路径即可
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      // 打包 css 代码 到文件中
      filename: "css/[name].css",
      chunkFilename: "css/common.[hash:5].css", // 针对公共样式的文件名
    }),
    new VueLoaderPlugin(), // vue-loader为15版本以上需要使用这个来解析vue
  ],
};
