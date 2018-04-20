const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

if (!isDev){
	const SSRContent = require('../dist/ssr').default
	const tpl = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
	app.use('/public', express.static(path.join(__dirname, '../dist')))
	app.get('*', (req, res) => {
		const appString = ReactSSR.renderToString(SSRContent)
		res.send(tpl.replace('<app></app>', appString))
	})
} else {
	const devstatic = require('../utils/server')
	devstatic(app)
}

app.listen(3333, () =>{
	console.log('The SSR is Listening 3333')
})