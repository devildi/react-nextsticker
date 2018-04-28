import React from 'react'
import { Link } from 'react-router-dom'

import Appbar from './components/appBar'
import RightDrawer from './components/RightDrawer'
import Fab from './components/fab'

import MyMapComponent from './components/googlemap'

import Routes from './config/router' 

require('./App.css')

export default class extends React.Component {
	render() {
		return (
			<div className='container'>
				<Appbar />
				<RightDrawer />
				<div className='mapContainer'>
					<MyMapComponent/>
				</div>
				<Fab />
			</div>
		)
	}
}