const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const setModule = () => {
    const entry = {}
    const htmlwebpackplugins = []
    const entryFiles = glob.sync(path.join(__dirname,"./src/*/index.js"));
    entryFiles.map((item, index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js$/)
        const pageName  = match && match[1]
        entry[pageName] = entryFile;
        htmlwebpackplugins.push(
            new HtmlWebpackPlugin({
                title: pageName,
                template: path.resolve(__dirname, `src/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true
            })
        )
    })
    return {
        entry,
        htmlwebpackplugins
    }
}

const { entry, htmlwebpackplugins } = setModule()
// !
// ？
// *
// //
// todo

module.exports = {
    entry: './src/index.js',
    // entry: {
    //     index: './src/index/index.js',
    //     detail: './src/detail/index.js',
    //     about: './src/index/index.js',
    // },
    //entry,
    mode: 'development',
    output: {
        // filename: 'index.js',
        filename: '[name].js',
        path: path.resolve(__dirname, "./dist")
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        // ...htmlwebpackplugins,
        new htmlWebpackPlugin({
            template: "./src/index.html",
            title: 'My App',
            filename: 'index.html',
            inject: 'body',
        }),
        // new htmlWebpackPlugin({
        //     template: "./src/index.html",
        //     title: 'My App',
        //     filename: 'detail.html',
        //     inject: 'body',
        //     chunks: ['detail']
        // }),
        // new htmlWebpackPlugin({
        //     template: "./src/index.html",
        //     title: 'My App',
        //     filename: 'about.html',
        //     inject: 'body',
        //     chunks: ['about']
        // }),
        new CleanWebpackPlugin(), // ! 清除原先的dist中的文件
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {   
                test: /\.(less|css)$/,
                use: [
                    // {   
                    //     loader: 'style-loader',
                    //     options: {
                    //         injectType: 'singletonStyleTag'
                    //     },
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash:8].[ext]',
                        outputPath: 'images'
                    }
                }

            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: "file-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        hot: true,
        hotOnly: true, // ! 热模块替换
        proxy: {
            '/api': {
                target: 'http://localhost:9090'
            }
        }
    },
}