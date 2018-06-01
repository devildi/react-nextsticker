const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
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
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, '../client'),
				use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
			}
		]
	},
	plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}

if(isDev){
	config.mode = 'development'
}
module.exports = config
