import { observable, computed, autorun, action, toJS } from 'mobx'
import axios from 'axios'

import data from '../../utils/data'

export default class TestMobx {
	constructor({isOpen, position, points, points1, directions} = {isOpen: false, position: {lat: 39.908892, lng: 116.404165}, points: [{position:{ lat: 41.868998, lng: 123.5270885999999 }, isOpen: false},{position: { lat: 41.6689984, lng: 123.42708859999998 }, isOpen: false}],points1: [], directions: null}) {
		this.isOpen = isOpen
	  this.position = position
	  this.points = points
	  this.points = points1
	  this.directions = directions
	  this.flag = null
	}

	@observable isOpen
	@observable position
	@observable points
	@observable points1
	@observable directions

	@computed get msg() {
		return `${this.name} say count is ${this.name}`
	}

	@action changeDrawerState() {
		this.isOpen = !this.isOpen
	}
	@action location() {
  	navigator.geolocation.getCurrentPosition((position) => {
    	const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.position = pos
    }, () => {alert('定位失败！')})		
	}

	@action fecthdata(){
		axios.get('/api/admin/get')
			.then((data) => {
				this.points = data.data.data
				this.points1 = data.data.data1
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

	toJson() {
    return {
      points: toJS(this.points),
      points1: toJS(this.points1),
      directions: toJS(this.directions)
    }
  }

  toCenter() {
    return {
      position: toJS(this.position)
    }
  }
}