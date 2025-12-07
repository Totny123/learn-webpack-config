const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

/**
 * Webpack 配置对象
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
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
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "@/scss-vars.scss";
              `,
              sassOptions: {
                includePaths: [__dirname],
              },
            },
          },
        ],
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
