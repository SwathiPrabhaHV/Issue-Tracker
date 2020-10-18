// const HtmlWebPackPlugin = require("html-webpack-plugin");
// const path = require('path');
//
// module.exports = {
// entry: "./public/App1.js",
// output: {
//   path: path.resolve(__dirname, 'dist'),
//   filename: 'app.bundle.js',
// },
// module: {
//   rules: [
//     {
//       test: /\.(js|jsx)$/,
//       exclude: /node_modules/,
//       use: {
//         loader: "babel-loader"
//       }
//     }
//   ]
// }
// // plugins: [new HtmlWebPackPlugin({ template: "./public/index.html" })]
// // mode: 'development'
// };
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry:  './public/App1.js' ,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  }
   // plugins: [new HtmlWebPackPlugin({
   //   template: "./public/index.html",
   //    filename: "./index.html"})]
};
