const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: ['./scripts/app.js', './index.html'],
  output: {
    filename: '[name].bundle.js',
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
        pathRewrite(req, path) {
          // use the pathRewrite to modify your path if needed
          return '/main.bundle.js';
        }
      }
    },
    historyApiFallback: true
  },
  /* plugins: [
   new HtmlWebpackPlugin({
      template: './index.html'
    })
  ], */

  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader']
      // },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')],
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jpe?g|svg|gif|eot|woff2?|ttf|html)$/i,
        exclude: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      /* {
        test: /\.html?$/i,
        use: ['html-loader']
      }, */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]'
              }
            }
          }
        ]
      }
    ]
  }
};
