const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getCSSLoaders = (loaders) => {
  return [
    // 'style-loader',
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          compileType: 'icss',
        },
      },
    },
    ...loaders,
  ];
};

/**
 * Webpack 配置对象
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: getCSSLoaders([
          {
            loader: 'less-loader',
            options: {
              additionalData: `
                @import "@/less-vars.less";
              `,
            },
          },
        ]),
      },
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
        use: getCSSLoaders([
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
        ]),
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
};

module.exports = config;
