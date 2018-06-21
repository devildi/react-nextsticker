const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
	maxAge: 10 * 60 * 1000,
	name: 'cid',
	resave: false,
	saveUninitialized: false,
	secret: '41538bc6dd'
}))
app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api', require('../utils/apiProxy'))

if(!isDev){
	console.log('Production')
	const SSRContent = require('../dist/ssr').default
	const tpl = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
	app.use('/public', express.static(path.join(__dirname, '../dist')))
	app.get('*', (req, res) => {
		const appString = ReactSSR.renderToString(SSRContent)
		res.send(tpl.replace('<app></app>', appString))
	})
}else {
	const devstatic = require('../utils/server')
	console.log('Development')
	devstatic(app)
}

app.listen(3333, () =>{
	console.log('The SSR is Listening 3333')
})