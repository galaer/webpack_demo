const webpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")

const config = require("./webpack.dev.js")
const options = {
  contentBase: "../dist",
  hot: true,
  host: "localhost"
  //   open: true // 自动打开浏览器
}

webpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(3000, "localhost", () => {
  console.log("dev server listening on port 5000")
})
