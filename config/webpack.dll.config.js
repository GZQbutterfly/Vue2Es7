const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
      'vendor': ['vue' , 'vue-property-decorator', 'vue-class-component']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};
