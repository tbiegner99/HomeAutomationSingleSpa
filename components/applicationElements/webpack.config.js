const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  watch: true,
  entry: './src/pages/app.js',
  output: {
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/api/kareoke': 'http://localhost:8080',
      '/api/tv': 'http://localhost:8080',
      '/api/todo': 'http://localhost:8080',
      '/api/security': 'http://localhost:8181',
      '/jsonrpc': 'http://192.168.2.205'
    },
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.html'
    })
  ],
  resolve: {
    alias: {
      react: path.resolve('node_modules/react')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')],
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jpe?g|svg|gif|eot|woff2?|ttf)$/i,
        exclude: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/svgs')],
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.html?$/i,
        use: ['html-loader']
      },
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
