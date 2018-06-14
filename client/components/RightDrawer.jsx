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

  handle(i){
    this.props.testMobx.openinfoWindowByName(i)
  }

  tapTitle(p){
    this.props.testMobx.setCenter(p)
    this.props.testMobx.changeDrawerState()
  }

  render() {
    let points = this.props.testMobx.toJson().points
    return (
      <div>
        <Drawer 
          width={200} 
          docked={false} 
          onRequestChange={this.handleClick.bind(this)} 
          openSecondary={true} 
          open={this.props.testMobx.isOpen} 
        >
          <AppBar 
            title={'详细路线'}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonClick={this.handleClick.bind(this)}
            //onTitleClick={() => this.tapTitle(points[0].route[0].location)}
          />
          {
            points && points.length > 0
            ? points.map((row,index) => (
                <div key={index}>
                  <div style={style}>Day {index+1}</div>
                  <Divider />
                  {
                    row.route && row.route.length > 0
                    ? row.route.map((r,i) => 
                        (
                          <MenuItem 
                            key={i} 
                            onClick={() => {this.handle(r.nameOfScene)}}>{r.nameOfScene}
                          </MenuItem>
                        )
                      )
                    : <div style={style}>无数据</div>
                  }
                </div>
              ))
            : <div style={style}>无数据</div>
          }
        </Drawer>
      </div>
    )
  }
}