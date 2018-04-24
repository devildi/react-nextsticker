import React from 'react'
import { Link } from 'react-router-dom'

import Routes from './config/router' 

require('./App.css')

export default class extends React.Component {
	render() {
		return [
			<div key='1'>
				<Link to='/'>首页</Link><br/>
				<Link to='/detail'>2级路由</Link>
			</div>,
			<Routes key='2'/>
		]
	}
}