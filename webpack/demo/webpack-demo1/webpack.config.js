const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            // 转化es5语法--preset预设
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', { loose: true}],// 转化es6高阶语法，如类
              ['@babel/plugin-transform-runtime',
                {
                  absoluteRuntime: false,
                  corejs: false,
                  helpers: true,
                  regenerator: true,
                  useESModules: false
                }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src') // 需要@babel/polyfill
      },
      /*
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 注意排列顺序，执行顺序与排列顺序相反
      }
      */
     {
       test: /\.css$/,
       use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
       ]
     }
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 5566,
    progress: true,
    open: true,
    hotOnly: true,
    hot: true,
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'common.css'
    })
  ]
}