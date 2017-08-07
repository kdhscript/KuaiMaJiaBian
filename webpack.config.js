'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //指定入口
    entry: {
        main: './main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            }, {
                test: /\.(jpg|ttf|svg|png|gif)$/,
                loader: 'url-loader?limit=1' //依赖file-loader
                    ,
                options: {
                    name: 'assets/[name].[ext]'
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                //排除路径
                exclude: /node_modules/,
                //更为推荐的方式是在.bablerc文件中配置以下设置
                // options: {   
                //     presets: ['es2015'],
                //     plugins: ['transform-runtime']
                // }
            },
            //处理.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, { //如果你是webpack-dev-server直接运行是没有问题的，但是你通过webpack命令执行，在生产环境中运行，如果不加上面这句话就有问题
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                // options: {
                //     presets: ['es2015'],
                //     plugins: ['transform-runtime']
                // }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
        })
    ],
    devServer: { //配置webpack-dev-server -> express服务器的选项
        host: '127.0.0.1', //A
        port: 9999,
        //代理 
        proxy: { //this.$ajax.get('/v2/xxxx')
            '/v2/*': { // 如果当前请求的url 是以/v2开头/xxxxxx,则默认请求127.0.1/v2/xxx
                changeOrigin: true, //changeOrigin就把当前本地express服务器由A变为向B请求并返回
                target: 'https://api.douban.com/', //B
            }
        }

    }

}
