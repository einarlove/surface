import webpack from 'webpack'
import path from 'path'
import reduce from 'lodash/collection/reduce'

const debug = process.env.NODE_ENV !== 'production'
const devtool = debug ? 'eval' : 'hidden-source-map'

const entry = {
  bundle: ['./src/index.jsx', './src/index.html'],
}

const output = {
  path: path.join(__dirname, '/build'),
  filename: '[name].js',
  publicPath: '/',
  pathinfo: debug,
}

const loaders = [
  {
    test: /\.jsx?$/,
    loader: debug ? 'react-hot!babel?stage=0&cacheDirectory' : 'babel?stage=0',
    exclude: /node_modules/,
  },
  {
    test: /\.json$/,
    loader: 'json',
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    loader: 'style!css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]!postcss',
    exclude: /node_modules/,
  },
  {
    test: /.(png|jpg|svg)$/,
    loader: 'url?limit=5000&name=images/[name].[ext]',
    exclude: [/node_modules/, /assets\/icons/],
  },
  {
    test: /\.svg$/,
    include: /assets\/icons/,
    loader: 'svg-inline',
  },
  {
    test: /\.(eot|ttf|woff2?)$/,
    loader: 'file?name=fonts/[name].[ext]',
  },
  {
    test: /\.html$/,
    loader: 'file?name=[name].[ext]',
  },
]

const env = {
  'NODE_ENV': debug ? 'development' : 'production',
}

const plugins = [
  new webpack.PrefetchPlugin('react'),
  new webpack.DefinePlugin(reduce(env, (prop, value, key) => {
    if (value) {
      prop['process.env.' + key] = JSON.stringify(value)
    }
    return prop
  }, {})),
]

const resolve = {
  extensions: ['', '.js', '.jsx', '.css'],
  modulesDirectories: ['node_modules', './src'],
  alias: {},
}

const postcss = [
  require('postcss-easings'),
  require('postcss-modules-values'),
  require('postcss-color-function')(),
]

export default {
  entry,
  devtool,
  output,
  module: {
    loaders,
  },
  plugins,
  resolve,
  postcss,
}
