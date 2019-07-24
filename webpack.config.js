/**
 * @file
 *
 * @author : zhoumh
 * @history :
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/4/26      1.0     First version
 *
 * Copyright 2019, all rights reserved. Essa.cn
 * */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清理 /dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry:{
        main: './raw/demo.js'
    },
    devtool: 'inline-source-map',
    output: {
        //根据入口起点名称动态生成 bundle 名称
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
   plugins: [
       new CleanWebpackPlugin(),
       // new HtmlWebpackPlugin({
       //     title: 'Output Management'
       // })
   ],
    mode: 'development', // 设置mode

    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 30000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

        }
    }

};