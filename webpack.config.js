const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const PerspectivePlugin = require('@finos/perspective-webpack-plugin')
module.exports = {
  target: 'web',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@codemirror': path.resolve(__dirname, 'node_modules/@codemirror/'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      process: require.resolve('process'),
      'process/browser': require.resolve('process/browser'),
      stream: require.resolve('stream-browserify'),
      vm: false,
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new PerspectivePlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    client: {
      overlay: false,
    },
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('*/env-config.js', function (req, res) {
        res.setHeader('Content-Type', 'application/javascript')
        res.sendFile(path.join(__dirname, 'dist', 'env-config.js'))
      })
      return middlewares
    },
  },
}
