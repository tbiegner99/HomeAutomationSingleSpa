const path = require('path');
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  devtool: 'source-map',
  watch: true,

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
      }
    ]
  }
};
