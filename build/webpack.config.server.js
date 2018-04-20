const path = require('path')

module.exports = {
	target:'node',
	mode: 'development',
	entry: {
		app: path.join(__dirname, '../client/ssr.js')
	},
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
