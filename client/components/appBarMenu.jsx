import React from 'react'


import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'


@inject('testMobx') @observer
class IconMenuExampleSimple extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  _delete(){
    window.localStorage.clear()
    this.props.testMobx.initData()
  }

  changePage(i){
    this.context.router.history.push(`/${i}`)
    this.props.testMobx.flag = null
  }

  render(){
    let user = this.props.testMobx.user
    return(
      <div>
        <IconMenu
          iconButtonElement={<IconButton><ActionHome /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          iconStyle={{color: 'white'}}
        >
          <MenuItem primaryText="路线详情" onClick={() => this.changePage('detail/' + user)}/>
          <MenuItem primaryText="更多线路" onClick={() => this.changePage('more')}/>
          <Divider />
          <MenuItem primaryText="退出" onClick={this._delete.bind(this)}/>
        </IconMenu>
      </div>
    )
  }
}

export default IconMenuExampleSimple