import { observable, computed, autorun, action, toJS } from 'mobx'
import axios from 'axios'

import data from '../../utils/data'

export default class TestMobx {
	constructor({isOpen, position, center, points, pointsP, points1, directions, all} = {isOpen: false, position: {}, center: {lat: 39.908892, lng: 116.404165}, points: [],pointsP: [],points1: [], directions: null, all: []}) {
		this.isOpen = isOpen
	  this.position = position
	  this.center = center
	  this.points = points
	  this.pointsP = pointsP
	  this.points1 = points1
	  this.directions = directions
	  this.flag = null
	  this.isLocating = false
	  this.isLocatingAlways = false
	  this.user = ''
	  this.all = all
	  this.id = null
	}

	@observable isOpen
	@observable position
	@observable center
	@observable points
	@observable pointsP
	@observable points1
	@observable directions
	@observable all
	@observable isLocating
	@observable isLocatingAlways

	@computed get msg() {
		return `${this.name} say count is ${this.name}`
	}

	@action changeDrawerState() {
		this.isOpen = !this.isOpen
	}

	@action location(i) {
		if(i){
			this.isLocating = true
		}
  	navigator.geolocation.getCurrentPosition((position) => {
    	const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.position = pos
      this.center = pos
      this.isLocating = false
    }, () => {
    	alert('谷歌地图定位失败！')
    	if(this.isLocating){
    		this.isLocating = false
    	}
    }, {
	    	enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
    	}
    )		
	}

	@action locationAlways() {
		this.isLocatingAlways = true
  	this.id = navigator.geolocation.watchPosition((position) => {
    	const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.position = pos
    }, () => {
    	alert('谷歌地图持续定位失败！')
    	if(this.isLocatingAlways){
    		this.isLocatingAlways = false
    	}
    }, {
	    	enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
    	}
    )
    this.isLocatingAlways = true
	}

	@action stopLocationAlways(){	
		navigator.geolocation.clearWatch(this.id)
		this.id = null
		this.isLocatingAlways = false
	}

	@action setCenter(p){
		this.center = p
	}

	@action setMyself(p){
		this.position = p
	}

	@action initData(){
		let data = JSON.parse(window.localStorage.getItem("dataNextsticker"))
		let user = window.localStorage.getItem("userNextsticker")
		if(data){
			this.points = data.points
			this.points1 = data.points1
			this.position = data.position
			this.center = data.center
			this.user = user
		} else {
			this.points = []
			this.points1 = []
			this.flag = null
			this.directions = null
		}
	}

	@action fatchData(i){
		return new Promise((resolve, reject) => {
			axios.get('/api/admin/get',{
				params: {
		      name: i
		    }
			})
			.then((data) => {
				this.points = data.data.data
				this.points1 = data.data.data1
				this.user = i
				this.save()
				resolve(data.data.data)
			})
		})
	}

	@action getAll(name){
		axios.get('/api/admin/all',{
			params: {
				name: name
			}
		})
		.then((data) => {
			this.all = data.data.data
		})
		.catch((err) => {
			console.log(err)
		})
	}

	@action getPersonalData(i){
		axios.get('/api/admin/get',{
			params: {
	      name: i
	    }
		})
		.then((data) => {
			this.pointsP = data.data.data
		})
	}

	@action openinfoWindow(j){
		let array = this.toJson().points1
		if(this.flag === null){
			array[j].isOpen = !array[j].isOpen
			this.points1 = array
			this.flag = j
		} else if(j !== this.flag) {
			array[this.flag].isOpen = !array[this.flag].isOpen
			array[j].isOpen = !array[j].isOpen
			this.points1 = array
			this.flag = j
		} else {
			array[j].isOpen = !array[j].isOpen
			this.points1 = array
		}
	}

	@action closeinfoWindow(j){
		let array = this.toJson().points1
		array[j].isOpen = !array[j].isOpen
		this.points1 = array
		this.flag = null
	}

	@action openinfoWindowByName(name){
		let array = this.toJson().points1
		let i = 0
		for (i; i < array.length; i++){
			if (array[i].nameOfScene === name){
				if(this.flag === i) {
					array[i].isOpen = !array[i].isOpen
					this.points1 = array
					this.flag = null
				} else if(this.flag === null){
					array[i].isOpen = !array[i].isOpen
					this.points1 = array
					this.flag = i
				} else {
					array[this.flag].isOpen = !array[this.flag].isOpen
					array[i].isOpen = !array[i].isOpen
					this.points1 = array
					this.flag = i
				}
				this.changeDrawerState()
				break
			}
		}
	}

	@action findWay(result, index){
		let array = this.toJson().points1
		array[index].detail = result.routes[0].legs[0].distance.text+'/'+result.routes[0].legs[0].duration.text
		this.points1 = array
		this.directions = result
	}

	@action findWayInGaode(result, index){
		let array = this.toJson().points1
		array[index].detail = result
		this.points1 = array
		this.directions = result
	}

	toJson() {
    return {
      points: toJS(this.points),
      pointsP: toJS(this.pointsP),
      points1: toJS(this.points1),
      directions: toJS(this.directions),
      position: toJS(this.position),
      center: toJS(this.center),
      all: toJS(this.all)
    }
  }

  save() {
  	let data = this.toJson()
  	let user = this.user
  	window.localStorage.setItem('dataNextsticker', JSON.stringify(data))
  	window.localStorage.setItem('userNextsticker', user)
  }
}