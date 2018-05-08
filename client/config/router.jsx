import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import MapG from '../views/map/index'
import Test from '../views/test/index'
import TestRouter from '../views/testRouter/index'

export default () => [
	<Route path='/' render={() => <Redirect to="/map" />} exact key='index'/>,
	<Route path='/map' component = {MapG} exact key='map'/>,
	<Route path='/test' component = {Test} exact key='test'/>,
	<Route path='/detail' component = {TestRouter} key='detail'/>
]