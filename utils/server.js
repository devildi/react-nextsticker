const axios = require('axios')
const webpack = require('webpack')
const MemoryFileSystem = require('memory-fs')
const path = require('path')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const bootstrapper = require('react-async-bootstrapper')

const serverConfig = require('../build/webpack.config.server')

const tplURL = 'http://localhost:8888/public/index.html'

const getTpl = () => {
	return new Promise((resolve, reject) => {
		axios.get(tplURL)
		.then(res => {
			resolve(res.data)
		})
		.catch(reject)
	})
}
//创建Module
const NativeModule = require('module')
const vm = require('vm')

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.imports, m.exports, require, m)
  return m
}

//通过内存读写
const fs = new MemoryFileSystem()
const serverCompiler = webpack(serverConfig)

serverCompiler.outputFileSystem = fs

serverCompiler.watch({}, (err, stats) => {
	if(err) throw err

	stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

	const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
	const bundle = fs.readFileSync(bundlePath, 'utf-8')//从内存读取server bundle
	//创建Module
	const m = getModuleFromString(bundle, 'ssr.js')
	serverBundle = m.exports.default
	createStore = m.exports.createStore
})

module.exports = function (app) {
	app.use('/public', proxy({
		target: 'http://localhost:8888'
	}))

	app.get('*', (req,res) => {
		getTpl()
		.then(tpl => {
			const routerContext = {}
			const stores = createStore()
			const app = serverBundle(stores, routerContext, req.url)
			bootstrapper(app).then(() => {

				if(routerContext.url){
					res.status(302).setHeader('Location', routerContext.url)
					res.end()
					return
				}
				//console.log(stores.testMobx.count)
				const content = ReactDomServer.renderToString(app)

				res.send(tpl.replace('<app></app>', content))
			})
		})
	})
}