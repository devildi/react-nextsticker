import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {observer, inject} from 'mobx-react'

const style = {
 card: {
	width: 400
 },
 btn: {
	float: 'right'
 },
 pic: {
	height: 100
 },
 block: {
 	backgroundColor: '#F0F0F0'
 }
}

@inject('testMobx') @observer
class CardExampleWithAvatar extends React.Component {

	handle(s, index){
		const DirectionsService = new google.maps.DirectionsService()
		DirectionsService.route({
      origin: this.props.testMobx.toCenter().position,
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
					subtitle={this.props.nameOfScene}
				/>
				<CardMedia>
					<img style={style.pic} src="https://res.cloudinary.com/dnfhsjz8u/image/upload/v1500442001/sample.jpg" alt="" />
				</CardMedia>
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