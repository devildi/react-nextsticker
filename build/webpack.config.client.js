const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/'
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
				loader: 'style-loader!css-loader'
			}
		]
	},
	plugins: [
		new HTMLPlugin({
			template: path.join(__dirname, '../client/template.html')
		}),
		new HTMLPlugin({
			template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
			filename: 'ssr.ejs'
		})
	]
}

if(isDev){
	config.devtool = '#cheap-module-eval-source-map'
	config.entry = {
		app: [
			'react-hot-loader/patch',
			path.join(__dirname, '../client/app.js')
		]
	}
	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		hot: true,
		overlay: {
			errors: true
		},
		publicPath: '/public/',
		historyApiFallback: {
			index: '/public/index.html'
		},
		proxy: {
	    '/api/*': {
	      target: 'http://localhost:3000',
	      changeOrigin: true,
	      secure: false
	    }
	  }
	}
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
	config.entry = {
		app: path.join(__dirname, '../client/app.js'),
		vendor: [
		'react', 
		'react-dom', 
		'react-router-dom', 
		'mobx', 
		'mobx-react',
		'axios'
		]
	}
	config.output.filename = '[name][chunkhash].js'
	config.plugins.push(
		new webpack.optimize.RuntimeChunkPlugin({
	    name: 'vendor'
	  }),
	  new webpack.optimize.RuntimeChunkPlugin({
	    name: 'manifast'
	  }),
	  new webpack.NamedModulesPlugin(),//为异步加载的模块命名
	  new webpack.DefinePlugin({
	    'process.env': JSON.stringify('production')
	  }),
	  new webpack.NamedChunksPlugin((chunk) => {
	    if(chunk.name){
	      return chunk.name
	    }
	    return chunk.mapModules(m => path.relative(m.context, m.request)).join('_')
	  })
	)
}

module.exports = config


