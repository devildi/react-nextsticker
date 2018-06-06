import React from 'react'
import ReactDOM from 'react-dom'
import { Map, InfoWindow, Marker } from 'react-amap'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {GridList, GridTile} from 'material-ui/GridList'
import {observer, inject} from 'mobx-react'

const pluginProps = {
  enableHighAccuracy:true,
  timeout: 10000,
  showButton: true
}

let walk = null
let transfer = null

@inject('testMobx') @observer
class Geolocation extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        throw new Error('Geolocation has to be a child of Map component');
      } else {
        this.map = props.__map__;
        this.element = props.__ele__;

        this.resolveGeolocation(props).then(() => {
          this.triggerCreated(props);
          this.map.addControl(this.geolocation)
          this.geolocation.getCurrentPosition()
          window.AMap.event.addListener(this.geolocation, 'complete', (data) => {
          	let myPosition = [data.position.getLng(),data.position.getLat()]
  					this.props.testMobx.setMyself(myPosition)
          })
    			window.AMap.event.addListener(this.geolocation, 'error', (data) => {
    				clert('高德地图定位失败，请刷新页面！')
    			}) 
        })
      }
    }
  }

  shouldComponentUpdate() {
    return false
  }

  resolveGeolocation(props){
    if (this.geolocation) {
      return new Promise((resolve) => {
        resolve(this.geolocation)
      })
    } else {
      return new Promise((resolve) => {
        this.map.plugin(['AMap.Geolocation'], () => {
          this.geolocation = new window.AMap.Geolocation(props)
          resolve(this.geolocation)
        })
      })
    }
  }

  triggerCreated(props) {
    const events = props.events || {}
    if (('created' in events) && (typeof events.created === 'function')) {
      events.created(this.geolocation)
    }
  }

  render(){
    return null
  }
}

const  DirectionsRenderer = (props) => {
	const map = props.__map__
  map.plugin('AMap.Walking', function() {
	  walk = new AMap.Walking({map: map})
	})
	map.plugin('AMap.Transfer', function() {
	  transfer = new AMap.Transfer({city: props.city, map: map})	
	})
  return null
}

const style = {
	marker: {
	  background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
	  backgroundSize: 'contain',
	  backgroundRepeat: 'no-repeat',
	  backgroundPosition: 'center',
	  width: '40px',
	  height: '40px',
	  color: '#000',
	  textAlign: 'center',
	  lineHeight: '40px'
	},
	btn: {
		float: 'right'
	},
	block: {
	 	backgroundColor: '#F0F0F0'
	},
	snackbar: {
		textAlign: 'center'
	}
}

@inject('testMobx') @observer
export default class extends React.Component{

	handle(s, i){
		walk.clear()
		transfer.clear()
		if(s === 'step'){
			walk.search(this.props.testMobx.toJson().position, this.props.testMobx.toJson().points1[i].location, (status, result) => {
	    	let result1 = '步行方案：'+'需步行'+result.routes[0].distance + '米/用时' + Math.ceil(result.routes[0].time/60) +'分钟'
	    	//this.props.testMobx.findWayInGaode(result1, i)
	    	alert(result1)
	    })
		} else {
			transfer.search(this.props.testMobx.toJson().position, this.props.testMobx.toJson().points1[i].location, (status, result) => {
	    	let result1 = '公交方案：'+'需步行'+result.plans[0].walking_distance + '米/用时' + Math.ceil(result.plans[0].time/60) +'分钟'
	   		//this.props.testMobx.findWayInGaode(result1, i)
	   		alert(result1)
	   	})
		}
		// if(s === 'step'){
		// 	this.walkPromise(this.props.testMobx.toJson().position, this.props.testMobx.toJson().points1[i].location)
		// 	.then((data) => {
		// 		alert(data)
		// 	})
		// } else{
		// 	this.transferPromise(this.props.testMobx.toJson().position, this.props.testMobx.toJson().points1[i].location)
		// 	.then((data) => {
		// 		alert(data)
		// 	})
		// }
	}

	walkPromise(from, to){
		return new Promise((resolve) => {
			walk.search(from, to, (status, result) => {
				let result1 = '步行方案：'+'需步行'+result.routes[0].distance + '米/用时' + Math.ceil(result.routes[0].time/60) +'分钟'
				
				resolve(result1)
			}) 
		})
	}

	transferPromise(from, to){
		return new Promise((resolve) => {
			transfer.search(from, to, (status, result) => {
				let result1 = '公交方案：'+'需步行'+result.plans[0].walking_distance + '米/用时' + Math.ceil(result.plans[0].time/60) +'分钟'
				
				resolve(result1)
			}) 
		})
	}

	handleTogglePrps(i){
		this.props.testMobx.openinfoWindow(i)
	}

  render(){
  	let points = this.props.testMobx.toJson().points1
  	let position = this.props.testMobx.toJson().position
    return (
			<div style={{width: '100%', height: '100%'}}>
	      <Map 
	      	amapkey={'fbe59813637de60223e3d22805a2486c'}
	      	zoom={12}
	      	resizeEnable={true}
      		mapStyle={'fresh'}
	      >
	      	<Geolocation {...pluginProps} />
	      	<DirectionsRenderer city='沈阳'/>
	      	{
	      		points && points.length
	      		?	points.map((row, index) => (
							<Marker
								clickable
			      		position={row.location}
			      		key={index}
			      	>
						    <div 
						    	onClick={() => this.handleTogglePrps(index)}
						    	style={style.marker}
						    >
						    	{index + 1}
						    </div>
						  </Marker>
	      		))
	      		: null
	      	}
	      	{
	      		points && points.length
	      		?	points.map((row, index) => (
							<InfoWindow
		            position={row.location}
		            visible={row.isOpen}
		            isCustom={true}
		            offset={[11, -20]}
		            key={index}
		          >
		          	<MuiThemeProvider>
		          		<div>
										<CardHeader
											title={row.nameOfScene}
										/>
											<GridList
									      cols={1}
									      cellHeight={200}
									      padding={0}
									    >
								        <GridTile>
								          <img src={row.pic}/>
								        </GridTile>
									    </GridList>
										<CardText>
											{row.des}
										</CardText>
										{
											row.detail && (
										<CardText 
											style={style.block}>
											{row.detail}
										</CardText>)
										}
										<CardActions>
											<RaisedButton 
												primary={true} 
												label="公交" 
												onClick={() => {this.handle('bus', index)}}
											/>
											<RaisedButton 
												primary={true} 
												label="步行"
												style={style.btn}
												onClick={() => {this.handle('step', index)}}
											/>
										</CardActions>
									</div>
		          	</MuiThemeProvider>
          		</InfoWindow>
	      		))
	      		: null
	      	}
	      </Map>
	    </div>
    )   
  }
}
