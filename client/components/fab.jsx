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
	},
	fab1: {
	  position: 'fixed',
		bottom: 90,
		left: 20,
		zIndex: 100
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
		if(!this.props.testMobx.isLocatingAlways){
			this.props.testMobx.locationAlways()
		} else {
			this.props.testMobx.stopLocationAlways()
		}
	}

	stop(){
		this.props.testMobx.stopLocationAlways()
	}

	render(){
		return (
			<div>
			{
				!this.props.testMobx.isLocatingAlways
				?<FloatingActionButton 
					style={style.fab1} 
					onClick={this.click.bind(this)}
					disabled={this.props.testMobx.isLocating}
				>
				  <ContentAdd />
				</FloatingActionButton>
				: null
			}
				<FloatingActionButton
				  secondary={true}
					style={style.fab} 
					onClick={this.click1.bind(this)}
				>
				  <ContentAdd />
				</FloatingActionButton>
				<Bar open={this.props.testMobx.isLocating} message='定位中，请稍后'/>
				<Bar 
					open={this.props.testMobx.isLocatingAlways} 
					message='持续定位已开启！' 
					autoHideDuration={2000}
				/>
			</div>
		)
	}
}

