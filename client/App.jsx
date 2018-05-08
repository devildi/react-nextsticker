import React from 'react'
import { Link } from 'react-router-dom'

import Routes from './config/router'

export default class extends React.Component {

	componentDidMount(){
		
	}

	render() {
		return [
			<Routes key='routes'/>
		]
	}
}