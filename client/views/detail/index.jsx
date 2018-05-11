import React from 'react'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/navigation/arrow-back'
import PropTypes from 'prop-types'
import {
  deepOrange300,
  purple500,
} from 'material-ui/styles/colors'

import data from '../../../utils/data' 

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
		bottom: 40,
		right: 40,
		zIndex: 100
	}
}

const tilesData = 
  {
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525840316305&di=c07beda105f1dc66966497f117b0dec1&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D51d3556b8e35e5dd8421ad9f1fbec283%2Fb2de9c82d158ccbf7290000312d8bc3eb13541de.jpg',
    title: '青岛浮生3日',
    author: 'DevilDI'
  }

class Container extends React.Component {
	render(){
		return (
			<div>
			{
				data && data.length
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
			       			r.map((row, index) => (
			       				<div key={index}>
											<h3>{row.name}</h3>
											<div style={style.border}>{row.des}</div>
										</div>
			       			))
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
	change(){
		this.context.router.history.push('map')
	}
	render() {
		return (
			<div>
				<GridList
		      cols={1}
		      cellHeight={300}
		      padding={0}
		    >
	        <GridTile>
	          <img src={tilesData.img} />
	        </GridTile>
		    </GridList>
		    <Container />
		    <FloatingActionButton style={style.fab} onClick={this.change.bind(this)}>
		      <ContentAdd />
		    </FloatingActionButton>
			</div>
		)
	}
}