import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('testMobx') @observer

export default class extends React.Component {

	bootstrap(){
		return new Promise((resolve) => {
      setTimeout(() => {
        this.props.testMobx.count = 3
        resolve(true)
      })
    })
	}

	render() {
		
		return (
			<div>this is test page, data from store: {this.props.testMobx.count}</div>
		)
	}
}