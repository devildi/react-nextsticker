import React from 'react'
import {observer, inject} from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/maps/my-location'
import Snackbar from 'material-ui/Snackbar'

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

@inject('testMobx') @observer
export default class FloatingActionButtonExampleSimple extends React.Component {
	click(){
		this.props.testMobx.location('s')
	}	

	render(){
		return (
			<div>
				<FloatingActionButton 
					style={style.fab} 
					onClick={this.click.bind(this)}
					disabled={this.props.testMobx.isLocating}
				>
				  <ContentAdd />
				</FloatingActionButton>
				<Snackbar
					style={style.snackbar}
          open={this.props.testMobx.isLocating}
          message="定位中，请稍后！"
          onRequestClose={this.handleRequestClose}
        />
			</div>
		)
	}
}

