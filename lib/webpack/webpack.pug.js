const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGES = fs.readdirSync('./src/components/pages/').filter(fileName => fileName.endsWith('.twig'));
const data = require('./src/data/data.json');

module.exports = {
	mode: 'development',

	entry: {
		index: './src/index.js'
	},

	output: {
		path: path.resolve(__dirname, 'docs')
	},

	stats: {
		children: true,
	},

	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: [/node_modules/, /src\/js/],
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(svg|png|jpg|gif|jpeg)$/,
				resourceQuery: /src\/images/,
				generator: {
					filename: 'images/[name][ext]'
				},
			},
			{
				test: /\.(mp4)$/,
				type: 'asset/resource',
				generator: {
					filename: 'video/[name][ext]'
				},
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
				resourceQuery: /src\/fonts/,
				generator: {
					filename: 'fonts/[name][ext]'
				}
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(pug|jade)$/,
				use: {
					loader: 'pug-loader',
					options: {
						pretty: true,
						self: true
					}
				}
			}
		]
	},

	devServer: {
		port: 8080,
		hot: true,
		open: true,
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/stylesheet.css',
			chunkFilename: '[id].css'
		}),
		...PAGES.map(page => new HtmlWebpackPlugin({
				template: `./src/components/pages/${page}`,
				filename: `${page.replace(/\.(pug|jade)$/, '.html')}`,
				cache: false,
				lang: 'en',
				data
			})
		)
	]
};