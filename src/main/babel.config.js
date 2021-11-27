module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-modules-systemjs',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]
  ]
};
