var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV_DEV = process.env.NODE_ENV === 'development';

var config = {
    entry: {
        admin: './js/admin-app/admin-app.js',
        search: './js/search-app/search-app.js'
    },
    output: {
        path: __dirname + '/build/scripts/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract("css!sass")
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new webpack.ProvidePlugin({
            angular: 'angular',
            _: 'underscore'
        }),
        new ExtractTextPlugin('../styles/styles.css', {
            allChunks: true
        })
    ],
    watch: ENV_DEV,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: (ENV_DEV ? 'source-map' : null)
};

if (ENV_DEV) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

module.exports = config;
