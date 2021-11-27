import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import styles from 'rollup-plugin-styles';
import pack from './package.json';

export default {
  input: './src/index.js',
  // external: ['@babel/runtime'],
  external: ['@babel/runtime', 'react', 'react-dom'],
  output: [
    {
      file: pack.module,
      format: 'es'
    },
    {
      file: pack.main,
      format: 'cjs'
    }
  ],
  plugins: [
    resolve(),
    styles({
      autoModules: true,
      modules: true
    }),
    json(),

    babel({ babelHelpers: 'runtime', skipPreflightCheck: true, exclude: 'node_modules/**' }),
    commonjs()
  ]
};
