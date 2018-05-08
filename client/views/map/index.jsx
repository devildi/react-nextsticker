import React from 'react'

import Appbar from '../../components/appBar'
import RightDrawer from '../../components/RightDrawer'
import Fab from '../../components/fab'
import MyMapComponent from '../../components/googlemap'

import {observer, inject} from 'mobx-react'

require('../../App.css')

@inject('testMobx') @observer
export default class extends React.Component {

	componentDidMount(){
		this.props.testMobx.fecthdata()
	}

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