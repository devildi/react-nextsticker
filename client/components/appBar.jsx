import React from 'react'
import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import Menu from './appBarMenu'
import TextField from 'material-ui/TextField'

import {observer, inject} from 'mobx-react'
const styles = {
  title: {
    cursor: 'pointer',
  },
}

class DialogExampleDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  handleClose(){
    this.props.login()
  }

  _submit(){
    if(!this.state.name){
      return alert('不能为空！')
    }
    this.props.fatch(this.state.name)
    this.props.login()
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this._submit.bind(this)}
      />,
    ]
    return (
      <div>
        <Dialog
          title="请输入行程编号："
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          <TextField
            hintText="请输入行程编号"
            onChange={(e) => {this.setState({name: e.target.value})}}
          />
        </Dialog>
      </div>
    )
  }
}

@inject('testMobx') @observer
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  handleClick(){
    this.props.testMobx.changeDrawerState()
  }

  fatch(i){
    this.props.testMobx.fatchData(i)
    .then((data) => {
      if(data.length === 0){
        return alert('暂无定制行程！')
      }
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  login(){
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span style={styles.title}>NextSticker</span>}
          iconElementLeft={
            this.props.testMobx.toJson().points1 && this.props.testMobx.toJson().points1.length > 0
            ? <Menu />
            : <IconButton><ActionHome /></IconButton>
          }
          iconElementRight={
            this.props.testMobx.toJson().points1 && this.props.testMobx.toJson().points1.length > 0
            ?<FlatButton label="Detail" onClick={this.handleClick.bind(this)}/>
            :<FlatButton label="行程编号" onClick={this.login.bind(this)}/>
          }
        />
        <DialogExampleDialog 
          open={this.state.open} 
          login={this.login.bind(this)}
          fatch={this.fatch.bind(this)}
        />
      </div>
    )
  }
}