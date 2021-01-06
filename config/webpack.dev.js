const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base');
const config = require('../leaves.json');
const autoprefixer = require('autoprefixer');
module.exports = merge({
    mode:'development',
    output:{
        filename:'[name].js',
        chunkFilename:'[name].js'
    },
    devtool:config.sourceMap.dev ? 'cheap-module-eval-source-map' : false,
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:1,
                            modules:true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('postcss-px2rem')({ 'remUnit': 37.5 }),
                                autoprefixer({
                                    remove: false
                                })
                            ]
                        }
                    },                  
                    {
                        loader:'less-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test:/\.(css|less)$/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('postcss-px2rem')({ 'remUnit': 37.5 }),
                                autoprefixer({
                                    remove: false
                                })
                            ]
                        }
                    },             
                    {
                        loader:'less-loader',
                        options: {
                            lessOptions:{
                                javascriptEnabled: true
                            }
                        }
                    }
                ],
                include: [path.resolve(__dirname, '../node_modules')]
            }
        ]
    },
    devServer: {
        port: config.devServer.port || '8080',
        contentBase:'../dist',
        compress:true,
        progress:true,
        host:config.devServer.host || 'localhost',
        open:true,
        openPage: config.devServer.openPage || 'pages/index',
        hot:true,
        proxy: config.devServer.proxy
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
},base);
