const path = require('path');

module.exports = {
  entry: ['./public/three.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
};
