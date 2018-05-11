import React from 'react'
import {observer, inject} from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/maps/my-location'
import Snackbar from 'material-ui/Snackbar'

const style = {
	fab: {
	  position: 'fixed',
		bottom: 40,
		left: 40,
		zIndex: 100
	},
	snackbar: {
		textAlign: 'center',
		height: 40,
		lineHeight: 40
	}
}

@inject('testMobx') @observer
export default class FloatingActionButtonExampleSimple extends React.Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
	  	open: false
	  }
	}

	handleClick = () => {
    this.setState({
      open: true,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

	click(){
		this.props.testMobx.location()
		this.setState({
      open: true,
    })
	}	

	render(){
		return (
			<div>
				<FloatingActionButton style={style.fab} onClick={this.click.bind(this)}>
				  <ContentAdd />
				</FloatingActionButton>
				<Snackbar
					style={style.snackbar}
          open={this.state.open}
          message="定位中，请稍后！"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
			</div>
		)
	}
}

