const path = require("path")
const merge = require("webpack-merge")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const common = require("./webpack.common.js")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = merge(common, {
  output: {
    filename: "js/[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  plugins: [
    new CleanWebpackPlugin(), //新版本默认删除webpack输出中的所有文件
    // new CleanWebpackPlugin(["./dist"], {
    //   root: path.resolve(__dirname, "..")
    // }),
    new UglifyJSPlugin()
  ]
})
