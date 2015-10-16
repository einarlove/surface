import webpack from 'webpack'
import path from 'path'

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
  {test: /\.json$/, loader: 'json', exclude: /node_modules/},
  {test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
  {
    test: /.(png|jpg|svg)$/,
    loader: 'url?limit=5000&name=images/[name].[ext]',
    exclude: [/node_modules/],
  },
  {test: /\.(eot|ttf|woff2?)$/, loader: 'file?name=fonts/[name].[ext]'},
  {test: /\.html$/, loader: 'file?name=[name].[ext]'},
]

const plugins = [
  new webpack.PrefetchPlugin('react'),
]

const resolve = {
  extensions: ['', '.js', '.jsx', '.css'],
  modulesDirectories: ['node_modules', './src'],
  alias: {},
}

export default {
  entry,
  devtool,
  output,
  module: {
    loaders,
  },
  plugins,
  resolve,
}
