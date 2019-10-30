require('dotenv').config();
const Assets = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const { DefinePlugin } = webpack;
const isDev = process.env.NODE_ENV !== 'production';
const sourcePath = path.join(__dirname, './src');
const resolveTsconfigPathsToAlias = require('./scripts/resolve-tsconfig-path-to-webpack-alias');

const options = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.html'],
    modules: ['node_modules', 'src'],
    alias: {
      ...resolveTsconfigPathsToAlias({
        tsconfigPath: path.join(__dirname, './tsconfig.json'), // Using custom path
        webpackConfigBasePath: path.join(__dirname, './'), // Using custom path
      }),
    },
  },
  resolveLoader: {
    modules: ['node_modules', 'src'],
  },
  entry: {
    index: './src/index.tsx',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        include: sourcePath,
        exclude: /node_modules/,
        options: {
          experimentalWatchApi: isDev,
        },
      },
      {
        test: /(\.styl|\.css)/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              sourceMap: isDev,
              importLoaders: 2,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].[hash:20].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: 'media/[name].[hash:20].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/assets/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new Assets([{ to: '', from: 'src/assets' }], {
      ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'],
      debug: 'warning',
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
        BACKEND_URL: JSON.stringify(process.env.BACKEND_URL),
        BACKEND_WEBSOCKET_URL: JSON.stringify(process.env.BACKEND_WEBSOCKET_URL),
      },
    }),
    new ExtractCssChunks({
      filename: isDev ? '[name].css' : 'css/[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : 'css/[name].[hash].css',
    }),
  ],
  devServer: {
    port: 8000,
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isDev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    // eslint-disable-next-line @typescript-eslint/camelcase
    child_process: 'empty',
  },
};

module.exports =
  isDev
    ? webpackMerge(options, require('./webpack/webpack.dev'))
    : webpackMerge(options, require('./webpack/webpack.dist'));
