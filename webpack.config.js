const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = 'production';
const getCSSLoaders = (loaders) => {
  return [
    mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
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
  mode,
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
    mode === 'production' &&
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          minSize: 0 /* 如果不写 0，由于 React 文件尺寸太小，会直接跳过 */,
          test: /[\\/]node_modules[\\/]/, // 为了匹配 /node_modules/ 或 \node_modules\
          name: 'vendors', // 文件名
          chunks: 'all', // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
          // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
          // 其中 vendors 是第三方的意思
        },
      },
    },
  },
};

module.exports = config;
