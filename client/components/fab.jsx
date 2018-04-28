import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

const style = {
  position: 'fixed',
	bottom: 40,
	left: 40,
	zIndex: 100
}

export default class FloatingActionButtonExampleSimple extends React.Component {
	click(){
		alert('yyyy')
	}	

	render(){
		return (
			<FloatingActionButton style={style} onClick={this.click.bind(this)}>
			  <ContentAdd />
			</FloatingActionButton>
		)
	}
}

