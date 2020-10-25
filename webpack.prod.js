// các thiết lập ở file này chri sử dụng cho môi trường developer (Môi trường phát triển)

// các thiết lập này sẽ chỉ sử dụng cho môi trường sản xuất (production)

const path = require('path')
const common = require('./webpack.common')
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production', //
    output: {

        filename: '[name].[contenthash].js',

        /* Ví dụ __dirname hiện tại là ./src
            Thì path.resolve(__dirname,'dist')  = ./src + '/' + 'dist' => ./src/dist                 
        */
        publicPath: 'http://localhost:8080/company-working/binvn-v2/dist/'
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        /*
        Trước tiên bạn cần hiểu minify là gì, đó là file được loại bỏ tất cả các khoảng trống thừa,
         gom các dòng code lại thành một hàng duy nhất,
         giúp giảm tối đa dung lượng file, nhằm giúp tối ưu source code hơn.
        */
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            /* TerserPlugin is Js Minifier/Compressor Plugin */
            new TerserPlugin()
        ]
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[contenthash].[ext]'
                },
            }],
        }]
    }
})