import React from 'react'
import ReactDOM from 'react-dom'
import { Map, InfoWindow, Marker } from 'react-amap'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {GridList, GridTile} from 'material-ui/GridList'
import Snackbar from 'material-ui/Snackbar'
import {observer, inject} from 'mobx-react'

const pluginProps = {
  enableHighAccuracy:true,
  timeout: 10000,
  showButton: true
}

let walk = null
let transfer = null

@inject('testMobx') @observer
class UIMarker extends React.Component {
  constructor(props) {
    super(props)
    this.loadUI()
  }

  loadUI() {
    window.AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
      this.initPage(SimpleMarker)
    })
  }

  geticonLabel(cat, label){
  	if(cat === '0'){
  		return {
  			label,
  			iconTheme: 'default',
  			iconStyle: 'red'
  		}
  	} else if(cat === '1') {
  		return {
  			iconLabel: 'F',
  			iconTheme: 'numv1',
  			iconStyle: 'blue'
  		}
  	} else {
  		return {
  			iconLabel: 'H',
  			iconTheme: 'numv2',
  			iconStyle: 'black'
  		}
  	}
  }

  initPage(SimpleMarker) {
    let uimarker = new SimpleMarker({
        iconLabel: this.geticonLabel(this.props.cat, this.props.label).label,
        iconTheme: this.geticonLabel(this.props.cat, this.props.label).iconTheme,
        iconStyle: this.geticonLabel(this.props.cat, this.props.label).iconStyle,
        map: this.props.__map__,
        position: this.props.position
    })
  
    uimarker.on('click', () => {
    	if(this.props.cat === '0') {
    		this.props.testMobx.openinfoWindow(this.props.index)
    	} else if(this.props.cat === '1'){
    		this.props.testMobx.openDinnerinfoWindow(this.props.index)
    	}
      
    })
  }

  render() {
    return null
  }
}

@inject('testMobx') @observer
class Geolocation extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        throw new Error('Geolocation has to be a child of Map component')
      } else {
        this.map = props.__map__
        this.element = props.__ele__

        this.resolveGeolocation(props).then(() => {
          this.triggerCreated(props)
          this.map.addControl(this.geolocation)
          this.geolocation.getCurrentPosition()
          window.AMap.event.addListener(this.geolocation, 'complete', (data) => {
          	let myPosition = [data.position.getLng(),data.position.getLat()]
  					this.props.testMobx.setMyself(myPosition)
          })
    			window.AMap.event.addListener(this.geolocation, 'error', (data) => {
    				console.log(data)
    				alert('高德地图定位失败，请刷新页面！')
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

class DirectionsRenderer extends React.Component {
	constructor(props) {
	  super(props)
	  const map = props.__map__
		window.AMap.service('AMap.Walking', function() {
	  	walk = new AMap.Walking({
	  		map: map
	  	})
		})
		window.AMap.service('AMap.Transfer', function() {
		  transfer = new AMap.Transfer({
		  	city: '青岛', 
		  	map: map
		  })	
		})
	}

	shouldComponentUpdate() {
    return false
  }
	  
  render(){
    return null
  }
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
	},
	window: {
		width: '250px'
	}
}

@inject('testMobx') @observer
export default class extends React.Component{

	handle(s, i, method){
		let points = this.props.testMobx.toJson().points1
  	let dinner = this.props.testMobx.toJson().dinner
  	let hotel = this.props.testMobx.toJson().hotel
		let des = null
		if(method === 'p'){
			des = points[i].location
		} else if(method === 'd') {
			des = dinner[i].location
		} else {
			des = hotel[i].location
		}
		walk.clear()
		transfer.clear()
		if(s === 'step'){
			walk.search(this.props.testMobx.toJson().position, des , (status, result) => {
	    	if(result.routes && result.routes.length > 0){
					let result1 = '步行方案：'+'需步行'+result.routes[0].distance + '米/用时' + Math.ceil(result.routes[0].time/60) +'分钟'
		    	this.props.testMobx.findWayInGaode(result1, i)
	    	} else{
					alert('暂无结果！')
	    	}
	    })
		} else {
			transfer.search(this.props.testMobx.toJson().position, des, (status, result) => {
	    	if(result.plans && result.plans.length > 0 ) {
	    		let result1 = '公交方案：'+'需步行'+result.plans[0].walking_distance + '米/用时' + Math.ceil(result.plans[0].time/60) +'分钟'
	    		this.props.testMobx.findWayInGaode(result1, i)
	    	} else {
	    		alert('暂无结果！')
	    	}  		
	   	})
		}
	}

	handleTogglePrps(i){
		this.props.testMobx.openinfoWindow(i)
	}

	handleRequestClose(){
		this.props.testMobx.controliSnackbar('close')
	}

  render(){
  	let pointsForCity = this.props.testMobx.toJson().points
  	let points = this.props.testMobx.toJson().points1
  	let dinner = this.props.testMobx.toJson().dinner
  	let hotel = this.props.testMobx.toJson().hotel
  	let position = this.props.testMobx.toJson().position
  	let cityArray = null
    if(pointsForCity && pointsForCity.length > 0){
      cityArray = pointsForCity[0].city.split(",")
    }
    // if(dinner && dinner.length){
    // 	dinner.map((r,i) => {
    // 		console.log(i,r.isOpen)
    // 	})
    // 	console.log('flag', this.props.testMobx.dinnerFlag)
    // }
    return (
			<div style={{width: '100%', height: '100%'}}>
	      <Map 
	      	amapkey={'fbe59813637de60223e3d22805a2486c'}
	      	zoom={15}
	      	resizeEnable={true}
      		mapStyle={'fresh'}
      		useAMapUI
	      >
	      	<Geolocation {...pluginProps} />
	      	<DirectionsRenderer city={cityArray && cityArray[0]}/>
	      	{
	      		points && points.length
	      		?	points.map((row, index) => (
	      			<UIMarker
							 	position={row.location}
							 	key={index}
							 	label={index+1}
							 	index={index}
							 	cat={row.category}
							/>
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
		            offset={[0, -25]}
		            key={index}
		          >
		          	<MuiThemeProvider>
		          		<div style={style.window}>
										<CardHeader
											title={row.nameOfScene}
										/>
											<GridList
									      cols={1}
									      cellHeight={150}
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
												onClick={() => {this.handle('bus', index, 'p')}}
											/>
											<RaisedButton 
												primary={true} 
												label="步行"
												style={style.btn}
												onClick={() => {this.handle('step', index, 'p')}}
											/>
										</CardActions>
									</div>
		          	</MuiThemeProvider>
          		</InfoWindow>
	      		))
	      		: null
	      	}
	      	{
	      		dinner && dinner.length
	      		?	dinner.map((row, index) => (
	      			<UIMarker
							 	position={row.location}
							 	key={index}
							 	label={index+1}
							 	index={index}
							 	cat={row.category}
							/>
	      		))
	      		: null
	      	}
	      	{
	      		dinner && dinner.length
	      		?	dinner.map((row, index) => (
							<InfoWindow
		            position={row.location}
		            visible={row.isOpen}
		            isCustom={true}
		            offset={[0, -25]}
		            key={index}
		          >
		          	<MuiThemeProvider>
		          		<div style={style.window}>
										<CardHeader
											title={row.nameOfScene}
										/>
											<GridList
									      cols={1}
									      cellHeight={150}
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
												onClick={() => {this.handle('bus', index, 'd')}}
											/>
											<RaisedButton 
												primary={true} 
												label="步行"
												style={style.btn}
												onClick={() => {this.handle('step', index, 'd')}}
											/>
										</CardActions>
									</div>
		          	</MuiThemeProvider>
          		</InfoWindow>
	      		))
	      		: null
	      	}
	      	{
	      		hotel && hotel.length
	      		?	hotel.map((row, index) => (
	      			<UIMarker
							 	position={row.location}
							 	key={index}
							 	label={index+1}
							 	index={index}
							 	cat={row.category}
							/>
	      		))
	      		: null
	      	}
	      	{
	      		hotel && hotel.length
	      		?	hotel.map((row, index) => (
							<InfoWindow
		            position={row.location}
		            visible={row.isOpen}
		            isCustom={true}
		            offset={[0, -25]}
		            key={index}
		          >
		          	<MuiThemeProvider>
		          		<div style={style.window}>
										<CardHeader
											title={row.nameOfScene}
										/>
											<GridList
									      cols={1}
									      cellHeight={150}
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
												onClick={() => {this.handle('bus', index, 'h')}}
											/>
											<RaisedButton 
												primary={true} 
												label="步行"
												style={style.btn}
												onClick={() => {this.handle('step', index, 'h')}}
											/>
										</CardActions>
									</div>
		          	</MuiThemeProvider>
          		</InfoWindow>
	      		))
	      		: null
	      	}
	      </Map>
	      <Snackbar
          open={this.props.testMobx.stateOfSnackbar}
          message="已加载行程数据！"
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
	    </div>
    )   
  }
}
