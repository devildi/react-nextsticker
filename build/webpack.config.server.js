const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	target:'node',
	entry: {
		app: path.join(__dirname, '../client/ssr.js')
	},
	externals: Object.keys(require('../package.json').dependencies),
	output: {
		filename: 'ssr.js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
}

if(isDev){
	config.mode = 'development'
}
module.exports = config
