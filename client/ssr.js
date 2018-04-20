import React from 'react'
import { StaticRouter } from 'react-router-dom'
import {Provider, useStaticRendering } from 'mobx-react'
import App from './App.jsx'

import { createStore } from './store/store'

useStaticRendering(true)//让mobxSSR时不会重复变换

export default (stores, routerContext, url) => {
	return (
		<Provider {...stores}>
			<StaticRouter context={routerContext} location={url}>
				<App />
			</StaticRouter>
		</Provider>
	)
}

export {createStore}