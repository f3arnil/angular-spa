var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var path = require('path');
//var AngularPlugin = require('angular-webpack-plugin');

var ENV_DEV = process.env.NODE_ENV === 'Development';

module.exports = {
    context: __dirname,
    entry: {
        search: path.resolve(__dirname, './js/search-app/search-app.js'),
        admin: path.resolve(__dirname, './js/admin-app/admin-app.js'),
        vendor: [
            'underscore',
            'angular',
            'angular-ui-router'
        ]
    },
    output: {
        path: path.resolve(__dirname, './build/scripts'),
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

        new webpack.ProvidePlugin({
            _: 'underscore'
            //angular: 'exports?window.angular!angular'
        }),
        new CommonsChunkPlugin('vendor', 'vendor.js'),
        new ExtractTextPlugin('../styles/styles.css', {
            allChunks: true
        })
    ],
    resolve: {
        root: path.resolve(__dirname, './js'),
        extensions: ['', '.js']
    },
    watch: ENV_DEV,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: (ENV_DEV ? 'source-map' : null)
};

if (!ENV_DEV) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: false,
        exclude: /.\.min\.js$/i
    }));
}
