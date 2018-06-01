import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme({
  userAgent: 'all'
})
import Routes from './config/router'

export default class extends React.Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<Routes key='routes'/>
			</MuiThemeProvider>
		)
	}
}