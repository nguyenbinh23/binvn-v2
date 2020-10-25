/*
    Cài đặt webpack
    npm init -y <=== cài đặt node_modules
    npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge <=== cài đặt webpack --save-dev tương đương --save-dev
    //  * webpack-cli: 'chưa biết ^^'
        * webpack-dev-server:  Dùng để phát triển, sẽ cập 
        nhật lại các thay đổi khi phát triển và lưu trữ 
        trong bộ nhớ (Không cần phải chạy npm run start)
        sau mỗi lần thay đổi.
        * webpack-merge: Dùng để gộp các thiết lập giữa webpack.common.js với webpack.dev.js 
        hoặc với webpack.prod.js
    
    - npm i --save-dev html-loader: html-loader: 
            bộ loader nhận diện các thẻ 
            img bên trong file html từ đó lấy link này kết hợp với 
            url-loader và file-loader sẽ tiến hành load ảnh vào hệ thống bundle.
    - npm i --save-dev raw-loader: 
            bộ loader giúp load file html dưới dạng javascript, hữu ích khi làm việc với angular 2 
            nó giúp must code của các đoạn mã html vào javascript.
    - npm i --save-dev html-webpack-plugin: được dùng để sắp xếp các file html theo một trật tự nhất định, giúp tối ưu nội dung file html hơn.
    - npm i --save-dev sass-loader: Dùng để tải SCSS và compile scss sang css
    - npm i --save-dev css-loader: Dùng để tải CSS và 
    - npm i --save-dev style-loader: Dùng để
    - npm i --save-dev mini-css-extract-plugin 
*/

//Webpack.common.js là nơi để tạo ra các thiết lập dùng chung  cho cả hai môi trường dev và production



/***************
 * Lấy đường dẫn folder của file 
    path.dirname('/public/demo/freetuts/logo.png'); 
    Kết quả: public/demo/freetuts




***************/
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //ở đây entry point tức có nghĩa là file đầu vào
    entry: {
        index: './src/index.js',
        vendor: './src/vendor.js'
    },
    // là value chuỗi regex , khi phân tích module thì webpack sẽ chỉ tìm những file 
    //khớp với định dạng này
    //loader: 'babel-loader', // load .Ở đây là vì mình chuyển đổi code es6 =>es5 nên dung babel
    //exclude: /node_module/, // bỏ qua các thư mục hoặc file khi khai bảo ở đây
    plugins: [
        //cài này nó render ra 1 template trong thư mục dist
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        //Trong đó có 1 file index.html tự động thêm đoạn script src="vendor.[hash].js"
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        /*tác dụng: khi chạy lệnh npm run build  
               xóa thư mục build cũ xong r build lại cái mới */
        new HtmlWebpackPlugin({
            template: 'src/views/lazysite-webpack.html',
            filename: 'views/lazysite-webpack.html',
            minify: false,
            chunks: ['index', 'vendor'],
        }),
        // new HtmlWebpackPlugin({
        //     template: 'src/views/index.phtml',
        //     filename: 'views/index.phtml',
        //     minify: false,
        //     chunks: ['index', 'vendor'],
        // }),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: 'http://localhost:8080/company-working/binvn-v2/dist/'
    },
    resolve: {
        alias: {
            'assets': path.resolve(__dirname, 'src'),
            'images': path.resolve(__dirname, 'src/public/assets/images'),
        }
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                //kiểm tra tất cả các file có đuôi là .css
                test: /\.css$/,
                use: [
                    //1 -> 2 -> 3
                    MiniCssExtractPlugin.loader,
                    /*3 Extract CSS into file 
                                       (load css xong rồi thêm vào file html tránh tình trạng phải 
                                       load js xong mới load được css)*/

                    "css-loader", //2 Turn css into commonjs
                    "sass-loader" //1 Turn sass into css
                ]
            },
            {
                test: /\.(html|phtml|php)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attributes: {
                            list: [
                                // All default supported tags and attributes
                                '...',
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-bgset',
                                    type: 'src',
                                }
                            ],
                            urlFilter: (attribute, value, resourcePath) => {
                                // The `attribute` argument contains a name of the HTML attribute.
                                // The `value` argument contains a value of the HTML attribute.
                                // The `resourcePath` argument contains a path to the loaded HTML file.
                                if (/error\/.*\.jpg$/.test(value)) {
                                    console.log(value)
                                    return false;
                                    /*có ngĩa là hình trong đường dẫn src="error/[name].jpg" 
                                     hoặc src="~error/[name].jpg" <= sẽ không được lấy: ))
                                     cái dấu ~ ở đây ý chỉ cho webpack ở đó là ông nên sửa 
                                     cái đường dẫn theo phần config trên
                                     resolve: {
                                        alias: {
                                            'error': path.resolve(__dirname, 'src/public/assets/images')
                                        }
                                    },
                                    */
                                }
                                console.log(value)
                                return true;
                                //còn lại là lấy lên
                            },
                            // root: '.',
                        },
                    }
                }
            },
        ]
    }
}