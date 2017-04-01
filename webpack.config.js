var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production'; //get the environment variable and get true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.(gif|svg|png|jpe?g)$/i,
                use: [
                    'file-loader',
                    {    //this shouldn't be an object, just the name of the loader but a bug make it crash
                        loader:'image-webpack-loader',
                        options:{}
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'titulo perro',
            // minify: {
            //     collapseWhitespace: isProd
            // },
            hash: true,
            // filename: './../index.html', location of generated file
            excludeChunks: ['contact'],
            template: './src/index.pug'
        }),
        new HtmlWebpackPlugin({
            title: 'titulo Gato contact',
            hash: true,
            chunks: ['contact'], //excludeChunks: ['app'] is the equivalent
            filename: 'contact.html',
            template: './src/contact.html'
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}
