import React from 'react'
import { Route } from 'react-router-dom'

import Test from '../views/test/index'
import TestRouter from '../views/testRouter/index'

export default () => [
	<Route path='/' component = {Test} exact key='test'/>,
	<Route path='/detail' component = {TestRouter} key='detail'/>
]