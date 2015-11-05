var webpack = require('webpack');
module.exports = {
    devServer: {
        port: 8000,
        hot: false
    },
    entry: {
        admin: './public/scripts/admin.js',
        search: './public/scripts/search.js'
    },
    output: {
        path: __dirname + '/public/scripts/',
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
