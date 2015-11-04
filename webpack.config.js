const ENV_DEV = 'development'
const ENV_PROD = 'production';

const NODE_ENV = process.env.NODE_ENV || ENV_DEV;
const WEBPACK = require('webpack');

/*if (WEBPACK !== undefined) {
  module.exports = {
    entry: {
      nodeApi: './file.js'
    },
    output: {
      path: __dirname,
      filename: 'pkg_[name].js',
      library: '[name]'
    },
    watch: NODE_ENV == ENV_DEV,
    watchOptions: {
      aggregateTimeout: 100
    },
    devtool: NODE_ENV == ENV_DEV ? 'cheap-inline-module-source-map' : null,
    plugins: [
        new WEBPACK.DefinePlugin({
          NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new WEBPACK.optimize.CommonsChunkPlugin({
          name: 'common'
        })
    ],
  }

  if (NODE_ENV == ENV_PROD) {
    module.exports.plugins.push(
        new WEBPACK.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
          }
        })
    );
  }
}*/