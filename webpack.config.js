const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
  },
  module:{
        rules:[{
            loader: 'babel-loader',
            test: /\.js$|jsx/,
            exclude: /node_modules/
        }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },]
    },

};
