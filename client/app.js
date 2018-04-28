import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer} from 'react-hot-loader'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Provider } from 'mobx-react'
import App from './App.jsx'
import MobxStore from './store/app-state'

const initialState = window.__INITIAL__STATE__ || {}
//console.log(initialState)
const root = document.getElementById('root')

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Provider testMobx={new MobxStore(initialState.testMobx)}>
				<BrowserRouter>
					<MuiThemeProvider>
						<Component />
					</MuiThemeProvider>
				</BrowserRouter>
			</Provider>
		</AppContainer>,
		root
	)
}

render(App)

if (module.hot){
	module.hot.accept('./App.jsx', () =>{
		const NextApp = require('./App.jsx').default
		render(NextApp)
	})
}