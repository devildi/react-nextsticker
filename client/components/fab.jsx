import React from 'react'
import {observer, inject} from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/maps/my-location'
import Snackbar from 'material-ui/Snackbar'
let timeOutEvent = 0
const style = {
	fab: {
	  position: 'fixed',
		bottom: 20,
		left: 20,
		zIndex: 100
	},
	snackbar: {
		textAlign: 'center'
	}
}

class Bar extends React.Component {
	render(){
		return(
			<Snackbar
				style={style.snackbar}
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={this.props.autoHideDuration || 0}
      />
		)
	}
}

@inject('testMobx') @observer
export default class FloatingActionButtonExampleSimple extends React.Component {
	click(){
		this.props.testMobx.location('s')
	}

	click1(){
		this.props.testMobx.stopLocationAlways()
	}

	one(){
		timeOutEvent = setTimeout(() => {
			timeOutEvent = 0
			this.props.testMobx.locationAlways()
		}, 1000)
	}

	two(){
		clearTimeout(timeOutEvent)
		timeOutEvent = 0
	}

	three(){
		clearTimeout(timeOutEvent)
		if(timeOutEvent !== 0){
			
		}
		return false
	}

	stop(){
		this.props.testMobx.stopLocationAlways()
	}

	render(){
		return (
			<div>
			{
				this.props.testMobx.longPress 
				?<FloatingActionButton
				  secondary={true}
					style={style.fab} 
					onClick={this.click1.bind(this)}
				>
				  <ContentAdd />
				</FloatingActionButton>
				:<FloatingActionButton 
					style={style.fab} 
					onClick={this.click.bind(this)}
					disabled={this.props.testMobx.isLocating}
					onTouchStart={this.one.bind(this)}
					onTouchMove={this.two.bind(this)}
					onTouchEnd={this.three.bind(this)}
				>
				  <ContentAdd />
				</FloatingActionButton>
			}
				<Bar open={this.props.testMobx.isLocating} message='定位中，请稍后'/>
				<Bar 
					open={this.props.testMobx.isLocatingAlways} 
					message='持续定位中！' 
					autoHideDuration={4000}
				/>
			</div>
		)
	}
}

