var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/app/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      // {
      //   //tell webpack to use jsx-loader for all *.jsx files
      //   test: /\.jsx$/,
      //   loader: 'jsx-loader?insertPragma=React.DOM&harmony'
      // },
      {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel',
  query: {
    presets: ['es2015','react']
    // plugins: ['transform-runtime']
  }
},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.(woff(2)?|eot|svg|ttf)$/, loaders: [
        "url-loader?limit=100000"
      ] },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'intl':'IntlPolyfill',
    'react': 'React'
  },
  resolve: {
    root: [__dirname],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'FB REACTIONS DATA VISUALIZATION',
    template: 'index.ejs', // Load a custom template
    // inject: 'body' // Inject all scripts into the body
  }),
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
],
//for DEV only TODO another config for PRD
devtool:"eval"
}
