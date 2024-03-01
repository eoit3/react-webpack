const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  devServer: {
    port: 2300, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, '../public') //托管静态资源public文件夹
    },
    proxy: {
      // 代理
      '/api': {
        target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin() // 添加热更新插件
  ]
})
