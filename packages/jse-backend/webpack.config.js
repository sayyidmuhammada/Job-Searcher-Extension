const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV = 'production' } = process.env;
module.exports = {
  entry: './index.ts',
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  externals: [nodeExternals()],
};
