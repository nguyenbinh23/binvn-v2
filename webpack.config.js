/*
    Cài đặt webpack
    npm init -y <=== cài đặt node_modules
    npm install -d webpack webpack-cli <=== cài đặt webpack
    npm i html-webpack-plugin
*/


/***************
 * Lấy đường dẫn folder của file 
    path.dirname('/public/demo/freetuts/logo.png'); 
    Kết quả: public/demo/freetuts

***************/

module.exports = {
    mode: 'development',
    entry: {
        filename: 'index.js'
    },
    output: {
        filename: '[name].js'
    }
}