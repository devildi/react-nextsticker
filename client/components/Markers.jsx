import React from 'react'
import {observer, inject} from 'mobx-react'
const { Marker,InfoWindow } = require("react-google-maps")

import CardComp from './card'
@inject('testMobx') @observer
export default class extends React.Component {

	handleToggle = () => {
		console.log(this.state.isOpen === true)
    this.setState({
    	isOpen: !this.state.isOpen
    })
	}

	handleTogglePrps = (i) => {
		let j = i - 1
		this.props.testMobx.openinfoWindow(j)
	}

	handleTogglePrpsClose = (i) => {
		let j = i - 1
		this.props.testMobx.closeinfoWindow(j)
	}

	render(){
		return(
			<Marker 
  			defaultAnimation={google.maps.Animation.DROP}
  			position={this.props.position} 
  			label={this.props.index}
  			onClick={() => this.handleTogglePrps(this.props.index)}
  		>
  			{
  				this.props.isOpen && 
  				<InfoWindow onCloseClick={() => this.handleTogglePrpsClose(this.props.index)}>
  					<div>
  						<CardComp 
  							nameOfScene={this.props.name}
  							des={this.props.des}
  							position={this.props.position}
  							index={this.props.index}
  							detail={this.props.detail}
  						/> 
  					</div>
  				</InfoWindow>
   			}	
			</Marker>
		)
	}
}