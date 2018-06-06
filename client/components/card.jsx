import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {GridList, GridTile} from 'material-ui/GridList'
import {observer, inject} from 'mobx-react'

const style = {
 card: {
	width: 250
 },
 btn: {
	float: 'right'
 },
 pic: {
	height: 100
 },
 block: {
 	backgroundColor: '#F0F0F0'
 },
 grid: {
 	width: '100%'
 }
}

@inject('testMobx') @observer
class CardExampleWithAvatar extends React.Component {

	handle(s, index){
		const DirectionsService = new google.maps.DirectionsService()
		DirectionsService.route({
      origin: this.props.testMobx.toJson().position,
      destination: this.props.position,
      travelMode: s
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.props.testMobx.findWay(result, index)
      } else {
        alert('暂无合适路线！')
      }
    })
	}

	render(){
		return (
			<Card style={style.card}>
				<CardHeader
					title={this.props.nameOfScene}
				/>
					<GridList
			      cols={1}
			      cellHeight={100}
			      padding={0}
			    >
		        <GridTile>
		          <img src={this.props.pic}/>
		        </GridTile>
			    </GridList>
				<CardText>
					{this.props.des}
				</CardText>
				{
					this.props.detail && (<CardText style={style.block}>
					{this.props.detail}
				</CardText>)
				}
				<CardActions>
					<RaisedButton 
						primary={true} 
						label="公交" 
						onClick={() =>{this.handle('TRANSIT', (this.props.index - 1))}}
					/>
					<RaisedButton 
						primary={true} 
						label="步行" 
						style={style.btn}
						onClick={() =>{this.handle('WALKING', (this.props.index - 1))}}
					/>
				</CardActions>
			</Card>
		)
	}
}

export default CardExampleWithAvatar