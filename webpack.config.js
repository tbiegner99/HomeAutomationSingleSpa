const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: ['./scripts/app.js', './html/index.html'],
  output: {
    filename: '[name].[contenthash].bundle.js',
    libraryTarget: 'system',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 7000,
    proxy: {
      '/api/kareoke': 'http://localhost:8080',
      '/homeApp': {
        target: 'http://localhost:8001',
        pathRewrite(/* req, path */) {
          // use the pathRewrite to modify your path if needed
          return '/main.bundle.js';
        }
      }
    },
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html?$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  }
};
