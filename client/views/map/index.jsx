import React from 'react'

import Appbar from '../../components/appBar'
import RightDrawer from '../../components/RightDrawer'
import Fab from '../../components/fab'
import MyMapComponent from '../../components/googlemap'
import Helmet from 'react-helmet'

import {observer, inject} from 'mobx-react'

require('../../App.css')

@inject('testMobx') @observer
export default class extends React.Component {
	componentDidMount(){
		this.props.testMobx.initData()
	}

	bootstrap(){
		return new Promise((resolve) => {
      //console.log(this.props.match)
      resolve(true)
    })
	}

	render() {
		return (
			<div className='container'>
				<Helmet>
					<title>Fancy your trip!</title>
					<meta name="google trip" content="Fancy Your Trip!"/>
				</Helmet>
				<Appbar/>
				<RightDrawer />
				<div className='mapContainer'>
					<MyMapComponent/>
				</div>
				<Fab />
			</div>
		)
	}
}