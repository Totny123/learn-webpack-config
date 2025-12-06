const ESLintPlugin = require('eslint-webpack-plugin');

/**
 * Webpack 配置对象
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react', { runtime: 'classic' }],
              ['@babel/preset-typescript'],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};

module.exports = config;
