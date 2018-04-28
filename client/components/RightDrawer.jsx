import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

import {observer, inject} from 'mobx-react'

const style = {
  textAlign: 'center',
  paddingTop: '10px',
  paddingBottom: '10px',
}

@inject('testMobx') @observer
export default class DrawerOpenRightExample extends React.Component {

  constructor(props) {
    super(props)
  }

  handleClick(){
    this.props.testMobx.changeDrawerState()
  }

  handleClick1(){
    this.props.testMobx.changeDrawerState()
  }

  render() {
    let points = this.props.testMobx.toJson().points
    return (
      <div>
        <Drawer width={200} docked={false} onRequestChange={this.handleClick1.bind(this)} openSecondary={true} open={this.props.testMobx.isOpen} >
          <AppBar 
            title="详细路线" 
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonClick={this.handleClick.bind(this)}
          />
          {
            points && points.length > 0
            ? points.map((row,index) => (
                <div key={index}>
                  <div style={style}>DAY {index+1}</div>
                  <Divider />
                  <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                  <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
                </div>
              ))
            : <div style={style}>无数据</div>
          }
        </Drawer>
      </div>
    );
  }
}