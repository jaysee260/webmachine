const webpack =           require('webpack');
const path =              require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// let commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
//     name: "vendor"
//   });

// Source Directory
const SRC_DIR = path.resolve(__dirname, './client/src');
const BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
  entry: {  
    // web: './public/web/src/index.js',
    // home: './public/home/src/index.js',
    // market: './public/market/src/index.js',
    // landing: './public/landing/src/index.js',
    // client: './public/client/src/index.js',
    // agents: './public/agents/src/index.js',
    // dashboard: './public/dashboard/src/index.js',
    // member_registration: './public/member/src/index.js'
    webmachine: [SRC_DIR + '/index.js']
    },
    output: {
      path: BUILD_DIR,
      publicPath: '/',
      filename: '[name]-bundle.js'
    },
    devtool: 'source-map',
    devServer: {
      contentBase: BUILD_DIR,
      port: 3000,
      compress: true,
      hot: true,
      open: true
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(otf|svg|eot|woff|woff2|ttf|jpg|jpeg|png|gif|md)$/,
        loaders: ['url-loader']
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Common: path.resolve(__dirname, 'public/common/'),
      Config: path.resolve(__dirname, 'config/')
    },
  
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // commonsPlugin,
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: './client/public/index.html'
      }
    )
  ]
 
};
