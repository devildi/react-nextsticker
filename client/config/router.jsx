import React from 'react'
import { Route, Redirect, withRouter,Switch} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import MapG from '../views/map/index'
import More from '../views/more/index'
import Detail from '../views/detail/index'
import Edit from '../views/edit/index'

const RouteController = ({isLogin, component: Component, ...rest}) => (
	<Route 
		{...rest}
		render = {
			(props) =>  (isLogin
				? <Component {...props} />
				: <Redirect to="/map" />
			)
		}
	/>
)

const InjectedRoute = withRouter(inject((store) => {
	return {
		isLogin: store.testMobx.user ? true : false
	}
})(observer(RouteController)))

RouteController.defaultProps = {
  isLogin: false
}

export default () => [
//<Switch>
		<Route path='/' render={() => <Redirect to="/map" />} exact key='index'/>,
		<Route path='/map' component = {MapG} exact key='map'/>,
		<Route path='/edit' component = {Edit} exact key='edit'/>,
		<InjectedRoute path='/more' component = {More} exact key='more'/>,
		<InjectedRoute path='/detail/:id' component = {Detail} exact key='detail'/>
//</Switch>
]