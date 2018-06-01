import React from 'react'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/navigation/arrow-back'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {
  deepOrange300,
  purple500,
} from 'material-ui/styles/colors' 

import {observer, inject} from 'mobx-react'

const style = {
	paper: {
		padding: 5,
		marginBottom: 25
	},
	paper1: {
		padding: 5,
	},
  con: {
  	display: 'flex',
  	flexDirection: 'row'
  },
  border: {
  	borderLeftStyle: 'solid',
  	borderColor: '#f0f0f0',
  	paddingLeft: 5
  },
  fab: {
	  position: 'fixed',
		bottom: 20,
		right: 20,
		zIndex: 100
	}
}
class Container extends React.Component {
	render(){
		let data = this.props.data
		return (
			<div>
			{
				data && data.length > 0
				? data.map((r, i) => (
						<Paper zDepth={3} style={style.paper} key={i}>
							<div style={style.con}>
								<div style={style.paper1}>
									<Avatar color={deepOrange300} backgroundColor={purple500} size={50}>
					          {'D'+ (1 + i)}
					        </Avatar>
			       		</div>
			       		<div>
			       		{
			       			r.route && r.route.length > 0
			       			?	r.route.map((row, index) => (
				       				<div key={index}>
												<h3>{row.nameOfScene}</h3>
												<div style={style.border}>{row.des}</div>
											</div>
				       			))
			       			: null
			       		}
			       		</div>
							</div>
						</Paper>
					))
				: <div>暂无数据</div>
			}
			</div>		
		)
	}
}

@inject('testMobx') @observer
export default class extends React.Component {
	static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount(){
  	if(this.props.match.params.id !== this.props.testMobx.user){
  		this.props.testMobx.getPersonalData(this.props.match.params.id)
  	}
  }

	change(){
		this.context.router.history.goBack()
	}

	render() {
		let data = this.props.testMobx.toJson().points
		let data1 = this.props.testMobx.toJson().pointsP
		let picURL = null
		if(data1 && data1.length > 0){
			picURL = data1[0].route[0].pic
		}
		return (
			<div>
				<Helmet>
					<title>Fancy your trip!</title>
					<meta name="google trip" content="Fancy Your Trip!"/>
				</Helmet>
				<GridList
		      cols={1}
		      cellHeight={300}
		      padding={0}
		    >
	        <GridTile>
	          <img src={this.props.match.params.id === this.props.testMobx.user ? data[0].route[0].pic : picURL} />
	        </GridTile>
		    </GridList>
		    <Container 
		    	data={ this.props.match.params.id !== this.props.testMobx.user ? data1 : data}
		    />
		    <FloatingActionButton style={style.fab} onClick={this.change.bind(this)}>
		      <ContentAdd />
		    </FloatingActionButton>
			</div>
		)
	}
}