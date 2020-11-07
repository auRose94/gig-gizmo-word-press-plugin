const path = require('path');

let externals = {
  jquery: 'jQuery',
  backbone: "Backbone",
  underscore: "_",
};

let entry = {
  "create-shows": "./js/src/create-shows.ts"
};

let moduleConfig = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};

let resolve = {
  extensions: [ '.tsx', '.ts', '.js' ],
};

module.exports = [
  {
    //Debug
    mode: "development",
    output: {
      filename: './js/[name].js',
      path: path.resolve(__dirname),
    },
    module: moduleConfig,
    entry,
    resolve,
    externals
  },
  {
    mode: "production",
    output: {
      filename: './js/[name].min.js',
      path: path.resolve(__dirname),
    },
    module: moduleConfig,
    entry,
    resolve,
    externals
  }
];