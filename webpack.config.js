const process = require('process')
const webpack = require('webpack')
const path = require('path')

const Dbust = require('webpack-dbust')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = () => {

	const debug = process.env.NODE_ENV === 'development'

	const plugins = []

	if(!debug) plugins.push(...[
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new Dbust({
			base: __dirname,
			autosave: process.env.WEBPACK_SOURCE !== 'gulp',
		}),
		new CompressionPlugin(),
	])

	return {
		mode: process.env.NODE_ENV,
		devtool: debug ? 'source-map' : false,
		optimization: { minimize: !debug },
		plugins,
		entry: {
			'main': [
				'babel-polyfill',
				'./source/js/handler.js',
			],
		},
		output: {
			path: path.join(__dirname, debug ? './public/js' : './build/js'),
			filename: debug ? '[name].js' : '[name]-[chunkhash].js'
		},
		module: {
			rules: [{
				test: /\.jsx?$/,
				exclude: [
					path.resolve(__dirname, 'node_modules'),
				],
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							'babel-plugin-lodash',
							'babel-plugin-transform-class-properties',
						].map(require.resolve),
						presets: [
							[ '@babel/preset-env', {
								targets: {
									browsers: [ 'last 4 versions' ],
								},
							}],
						],
					},
				},
			}],
		},
	}
}
