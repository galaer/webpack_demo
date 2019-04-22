const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

console.log("process.env.NODE_ENV", process.env.NODE_ENV)
const ENV = process.env.NODE_ENV

module.exports = {
  entry: {
    polyfill: "babel-polyfill",
    app: "./src/view/index.js",
    ventor: ["axios"]
  },
  // output: {
  //   filename: "js/[name].[hash:8].js",
  //   path: path.resolve(__dirname, "../dist"),
  //   publicPath: "/"
  // },
  plugins: [
    // new CleanWebpackPlugin(), //默认删除webpack输出中的所有文件
    // new CleanWebpackPlugin(["./dist"], {
    //   root: path.resolve(__dirname, "..")
    // }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "HtmlWebpackPlugin" //如果设置了 template 则 title 失效
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename:
        ENV === "production"
          ? "css/[name].[chunkhash:8].css"
          : "css/[name].css",
      chunkFilename:
        ENV === "production" ? "css/[name].[chunkhash:8].css" : "css/[name].css"
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ["vendor"],
    //   minChunks: Infinity,
    //   filename: "js/common.bundle.[chunkhash:8].js"
    // })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 1
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      }
    ]
  }
}
