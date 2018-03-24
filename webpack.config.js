const webpack =           require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');

let commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor"
  });

module.exports = {
  entry: {  
    web: './public/web/src/index.js',
    market: './public/market/src/index.js',
    landing: './public/landing/src/index.js'
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
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/public/dist',
    publicPath: '/',
    filename: '[name]-bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    commonsPlugin,
    new BrowserSyncPlugin({
      // browse to http://localhost:3100/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3100,
      files: ['./public/market/*.js'],
      proxy: 'http://localhost:3000/'
    }, {
      reload: true
    })
  ],
  devServer: {
    contentBase: './public/dist',
    hot: true
  }
};
