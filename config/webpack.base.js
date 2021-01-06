const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const {setEntry,setHtmlPlugin} = require('./webpack.util');

const config = require('../leaves.json');

module.exports = {
    entry:setEntry(),
    output: {
        path:path.join(__dirname,`../dist/${config.projectName}`)
    },
    module: {
        rules: [
            // 将es6编译成es5
            {
                test:/\.jsx?$/,
                exclude: /node_modules/, // 不编译某目录下的文件
                include:path.resolve(__dirname,'../src'), // 只在include包含的目录下进行loader编译
                use:[
                    {
                        loader:'babel-loader'
                    }
                ]
            },
            {
                test:/\.(jpg|png|gif)$/,
                use: {
                    loader:'url-loader',
                    options:{
                        name:'[name].[ext]?[hash]',
                        outputPath:'images/',
                        limit: 4096 // 当图片大于4k时以文件形式输出，否则以base64输出
                    }
                },
                exclude: /node_modules/
            },
            // 引入字体，svg等文件
            {
                test:/\.(eot|ttf|svg)$/,
                use:{
                    loader:'file-loader'
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new FriendlyErrorsWebpackPlugin(),
        ...setHtmlPlugin()
    ],
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
            'components':path.resolve(__dirname,'../src/components'),
            '@':path.resolve(__dirname,'../src'),
            'utils':path.resolve(__dirname,'../src/utils'),
            'api':path.resolve(__dirname,'../src/api'),
            'common':path.resolve(__dirname,'../src/common')
        }
    },
    optimization:{
        splitChunks:{
            chunks:'initial',
            // minSize:30000, // 当超过指定大小时做切割
            // minChunks:1, //模块至少使用次数
            // maxAsyncRequests:5, //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
            // maxInitialRequests:3, //首页加载的时候引入的文件最多3个
            // automaticNameDelimiter: '_', //缓存组和生成文件名称之间的连接符
            name: true, // 缓存组里面的filename生效，覆盖默认命名
            cacheGroups:{ // 缓存组
                dll:{
                    test:/[\\/]react[\\/]|[\\/]react-dom[\\/]/,
                    priority: -5,
                    name:'commons/dll',
                    reuseExistingChunk:true
                },
                common:{
                    test:/[\\/]common[\\/]|[\\/]utils[\\/]/,
                    priority: -10,
                    name:'commons/common',
                    reuseExistingChunk:true
                },
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    priority: -10,
                    name:'commons/vendors',
                    reuseExistingChunk:true
                }
            }
        },
        usedExports:true
    }
};
