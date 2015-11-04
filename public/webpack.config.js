var webpack = require('webpack');
module.exports = {
    devServer: {
        port: 8000,
        hot: false
    },
    //entry: {
    //    admin: "./public/scripts/admin.js",
    //    search: "./public/scripts/search.js"
    //},
    //output: {
    //    path: __dirname + '/public/scripts/',
    //    filename: "[name].bundle.js"
    //},
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {optional: ["es7.classProperties"]}}
        ]
    },
    plugins: [
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ], ["normal", "loader"]),
        plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js") ]
    ],
    devtool: "source-map"
};
