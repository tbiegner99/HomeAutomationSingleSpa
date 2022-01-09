const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  console.log(env);
  return {
    devtool: 'source-map',
    mode: env.MODE || 'development',
    entry: ['./scripts/app.js'],
    output: {
      filename: 'home-automation-main.js',
      libraryTarget: 'system',
      path: path.resolve(__dirname, 'build', process.env.OUTDIR || ''),
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'html/index.ejs',
        templateParameters: {
          env: env.ENVIRONMENT || 'development'
        }
      })
    ],
    devServer: {
      hot: true,
      host: '0.0.0.0',
      port: 7000,
      proxy: {
        '/config': `${env.PROD_SERVER}`,
        '/app': `${env.PROD_SERVER}`
      },
      historyApiFallback: true
    },

    module: {
      rules: [
        // {
        //   test: /\.(js)$/,
        //   exclude: /node_modules/,
        //   use: ['babel-loader']
        // },
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
};
