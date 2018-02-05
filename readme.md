https://stanko.github.io/webpack-babel-react-revisited/

# Init and webpack ---------------------------------

1. Create new folder with package.json in it. Insert following lines in package.json.

```
{
  "name": "your-project-name-here"
}
```

2. Install webpack for module bundling, meaning it will transpile and bundle our Javascript files, compile SASS or PostCSS, optimize images, etc.

npm install --save-dev webpack

3. Create src folder with your index.js in it

4. Run webpack from terminal for the first time. The command below runs webpack using our index.js as entry and outputs the result to the dist folder.

./node_modules/webpack/bin/webpack.js ./src/index.js --output-filename ./dist/app.bundle.js


5. Create webpack.config.js in our project's root. You'll see that we added our index.js as entry and for output we selected dist folder and app.bundle.js as the file name. Now we can run webpack without inline configuration. By default webpack looks for webpack.config.js and reads config from it

```
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + 'dist',
    filename: 'app.bundle.js'
  }
}
```

6. Add script section in package.json so it looks something like
```
{
  "name": "webpack-babel-react-revisited",
  "devDependencies": {
    "webpack": "^3.6.0"
  },
  "scripts": {
    "build": "webpack"
  }
}
```

7. 'npm run build' to make sure everything's good so far

# Webpack dev server ---------------------------------
1. Install the webpack dev server

npm install --save-dev webpack-dev-server

2. Update package.json script to allow 'npm run dev' shortcut

```
{
  "name": "webpack-babel-react-revisited",
  "devDependencies": {
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.1"
  },
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  }
}
```

3. You can run 'npm run dev' to fire up dev server on http://localhost:8080. For now it will just list project files

4. Create simple index.html in project root

5. Update webpack.config.js to use project root as content base

```
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + 'dist',
    filename: 'app.bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}
```

6. Restart 'npm run dev' and visit 8080 to make sure HTML is showing. No signs of Javascript yet, but we'll automatically inject <script> tags with a html-webpack-plugin


# HTML Webpack Plugin ---------------------------------

1. This plugin simplifies creation of HTML files to serve webpack bundles.

npm install --save-dev html-webpack-plugin

2. Update your webpack.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + 'dist',
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  }
};

```

# Babel ---------------------------------

1. To use ES2015 and beyond, you need Babel. Babel takes modern JS and transpiles it to older JS to be executed on browsers not supporting modern JS. You'll need 4 pages:
- Babel core package
- Babel webpack loader
- Babel env preset
- Babel React preset

npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react

2. Babel also has default config file which is .babelrc, so create it in project root. This will tell Babel to use two presets we just installed

touch .babelrc

```
{
  "presets": ["env", "react"]
}
```

3. Update webpack.config.js to use Babel loader for .js and .jsx files
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + 'dist',
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  }
};
```

4. npm run dev to make sure everything's good so far. Nothing's really changed but JS is now transpiled and if you were to use ES6 syntax, it'll be transpiled to ES5 syntax

# React ---------------------------------

1. Install React

npm install --save react react-dom

2. You should now be able to use React in your index.js files
