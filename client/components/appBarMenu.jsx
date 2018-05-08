import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import Divider from 'material-ui/Divider'

const IconMenuExampleSimple = () => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><ActionHome /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      iconStyle={{color: 'white'}}
    >
      <MenuItem primaryText="路线详情" />
      <MenuItem primaryText="更多线路" />
      <Divider />
      <MenuItem primaryText="退出" />
    </IconMenu>
  </div>
)

export default IconMenuExampleSimple