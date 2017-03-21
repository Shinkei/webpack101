var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: 'dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {test: /\.scss$/,
             use: ExtractTextPlugin.extract({
                 fallbackLoader: 'style-loader',
                 use: ['css-loader', 'sass-loader'],
                 publicPath: '/dist'
                 })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'titulo perro',
           // minify: {
           //     collapseWhitespace: true  
           // },
            hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        })
    ]
}
