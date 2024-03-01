// webpack.base.js
const webpack = require('webpack')
const path = require('path')
const WebpackBarPlugin = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

let dotEnv = ''
switch (process.env.NODE_ENV) {
  case 'development':
    dotEnv = '.env.development'
    break
  case 'production':
    dotEnv = '.env.production'
    break
  default:
    dotEnv = '.env.development'
}

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
  output: {
    path: path.join(__dirname, '../dist'), //
    filename: 'static/js/[name].[chunkhash:8].js', // // 加上[chunkhash:8]
    clean: true, //
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve('./src'),
      '@stateless': path.resolve('./src/components/stateless'),
      '@pages': path.resolve('./src/pages'),
      '@stateful': path.resolve('./src/components/stateful'),
      '@hooks': path.resolve('./src/components/hooks'),
      '@container': path.resolve('./src/components/container'),
      '@assets': path.resolve('./src/assets'),
      '@pages': path.resolve('./src/pages'),
      '@routers': path.resolve('./src/routers'),
      '@utils': path.resolve('./src/utils'),
      '@theme': path.resolve('./src/theme'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts)|(tsx)$/,
        include: [path.resolve(__dirname, '../src')], //  只对项目src文件的ts,tsx进行loader解析,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.css$/, //匹配所有的 css 文件
        include: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../node_modules/antd/dist/reset.css'),
            path.resolve(__dirname, '../node_modules/video.js/dist/video-js.css'),
            path.resolve(__dirname, '../node_modules/highlight.js/styles/github.css'),

        ],
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/, //匹配所有的 less 文件

        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },

      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]' // 加上[contenthash:8]
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体文件
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 加上[contenthash:8]
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 加上[contenthash:8]
        }
      }
    ]
  },

  plugins: [
    new WebpackBarPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ]
}
