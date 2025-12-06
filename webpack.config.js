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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react', { runtime: 'classic' }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx'],
    }),
  ],
};

module.exports = config;
