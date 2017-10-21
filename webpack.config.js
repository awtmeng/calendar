//自动产出html插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//自动打开浏览器的插件
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
// npm install html-webpack-plugin open-browser-webpack-plugin --save-dev
module.exports = {
    //指定入口文件 要把哪个文件以及它依赖的文件打包成一个文件
    entry:'./src/index.js',
    output:{//指定输出的文件目录和文件名
        path:'./build', //指定输出的目录
        filename:'calendar.js' //指定输出的文件名
    },
    // npm install webpack-dev-server --save-dev
    //服务启动时会自动打包，但是打包到内存里的，直接访问可以返回，但硬盘上看不见
    devServer:{
       inline:true,//当源代码改变之后，会自动重新打包并刷新浏览器
       port:8080,//指定端口号
       contentBase:'./build'//指定静态文件根目录
    },
    //配置模块
    module:{
        loaders:[
            {
                test:/\.js$/,//如果文件名符合正则
                // npm install babel-loader babel-core --save-dev
                loader:'babel'//使用babel加载器
            },
                // npm install css-loader style-loader --save-dev
            {
                test:/\.css$/,
                //用到二个loader,style-loader css-loader
                //执行的时候从右向左执行
                loader:'style!css'
            },
                // npm install css-loader style-loader --save-dev
            {
                test:/\.styl$/,
                //用到二个loader,style-loader css-loader
                //执行的时候从右向左执行
                loader:'stylus-loader'
            }
        ]
    },
    plugins:[
        //创建一个自动产出html的插件
        new HtmlWebpackPlugin({
            inject: 'head',
            //指定生成依据的模板
            template:'./src/index.html'
        }),
        //创建一个自动打开浏览器的插件
        new OpenBrowserWebpackPlugin({
            url:'http://localhost:8080'
        })

    ]
}