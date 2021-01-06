const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const config  = require('../leaves.json');
module.exports = merge({
    mode:'production',
    output:{
        filename:'[name].js',
        chunkFilename:'[name].js'
    },
    devtool:config.sourceMap.prod ? 'source-map' : false,
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:2,
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
                    'less-loader'
                ],
                exclude: [path.resolve(__dirname, '../node_modules')]
            },
            {
                test:/\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
            },
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                include:path.resolve(__dirname,'../src'),
                loader:['babel-loader']
            },
            {
                test:/\.(js|jsx)$/,
                loader:'eslint-loader',
                options:{
                    exclude: /node_modules/,
                    include:path.resolve(__dirname,'../src'),
                    quiet:true,
                    formatter: require('../.eslintrc.js')
                },
                enforce:'pre'
            }
        ]
    },
    plugins:[
        config.BundleAnalyzer ? new BundleAnalyzerPlugin()
            : new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash:8].css'
        })
        
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache:true,
                parallel:true,
                sourceMap:true,
                terserOptions: {
                    drop_console:true,
                    drop_debugger:true,
                    format:{
                        comments:false
                    }
                },
                extractComments:true
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions:{
                    safe:true
                }
            })
        ]
    }
},base);
