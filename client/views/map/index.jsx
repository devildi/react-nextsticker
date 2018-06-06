import React from 'react'

import Appbar from '../../components/appBar'
import RightDrawer from '../../components/RightDrawer'
import Fab from '../../components/fab'
import MyMapComponent from '../../components/googlemap'
import GaodeComponent from '../../components/gaode'
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
		let points = this.props.testMobx.toJson().points
		let useGoogleMap = null
		if(points && points.length > 0){
			useGoogleMap = points[0].useGoogle
		}
		return (
			<div className='container'>
				<Helmet>
					<title>Fancy your trip!</title>
					<meta name="nextsticker" content="Fancy Your Trip!"/>
				</Helmet>
				<Appbar/>
				<RightDrawer />
				<div className='mapContainer'>
				{
					useGoogleMap === '1'
					? <MyMapComponent />
					: <GaodeComponent />
				}
				</div>
				{
					useGoogleMap === '1'
					? <Fab />
					: null
				}
			</div>
		)
	}
}