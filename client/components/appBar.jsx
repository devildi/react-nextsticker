import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import Menu from './appBarMenu'

import {observer, inject} from 'mobx-react'
const styles = {
  title: {
    cursor: 'pointer',
  },
}

@inject('testMobx') @observer
export default class extends React.Component {
  handleClick(){
    this.props.testMobx.changeDrawerState()
  }

  render() {
    return (
      <AppBar
        title={<span style={styles.title}>NextSticker</span>}
        onRightIconButtonClick={this.handleClick.bind(this)}
        iconElementLeft={<Menu />}
        iconElementRight={<FlatButton label="Detail" />}
      />
    )
  }
}