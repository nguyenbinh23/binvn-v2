// các thiết lập này sẽ chỉ sử dụng cho môi trường sản xuất (production)
const path = require('path');
const common = require('./webpack.common');
const { merge } = require("webpack-merge");
const webpack = require('webpack')
module.exports = merge(common, {
    /*  Ở môi trường production thì khác so với dev ở chỗ các file js biên dịch thành thành 1 dòng,
        được gán thêm đuôi hash ví dụ main.js => main.asdasdasidu89127378.js <== 
        mỗi khi build thì hash sẽ thay đổi => tên file sẽ thay đổi, 
        trình duyệt sẽ tự động cập nhật lại những thay đổi mới,
        tránh tình trạng trùng name dẫn đên cached
    */
    // mode: 'development',
    mode: "development",
    output: {
        /*
        nếu muốn đặt tên version theo ý mún thì bỏ contentHash đi và thêm vào đoạn text ở sau file name
        ví dụ
        filename: '[name]-1.0.bundle.js' , => phiên bản 1
        path: path.resolve(__dirname, "dist")
            /* Ví dụ __dirname hiện tại là ./src
                Thì path.resolve(__dirname,'dist')  = ./src + '/' + 'dist' => ./src/dist                 
        */
        filename: '[name].js',

        /* Ví dụ __dirname hiện tại là ./src
            Thì path.resolve(__dirname,'dist')  = ./src + '/' + 'dist' => ./src/dist                 
        */
        path: path.resolve(__dirname, "dist"),

    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                },
            }],
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/views',
        watchContentBase: true,
        compress: true,
        port: 9000,
        hot: true,
        inline: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});