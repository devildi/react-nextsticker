import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import MapG from '../views/map/index'
import More from '../views/more/index'
import Detail from '../views/detail/index'
import Edit from '../views/edit/index'

export default () => [
	<Route path='/' render={() => <Redirect to="/map" />} exact key='index'/>,
	<Route path='/map' component = {MapG} exact key='map'/>,
	<Route path='/more' component = {More} exact key='more'/>,
	<Route path='/edit' component = {Edit} exact key='edit'/>,
	<Route path='/detail/:id' component = {Detail} key='detail'/>
]