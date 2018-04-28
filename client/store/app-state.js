import { observable, computed, autorun, action, toJS } from 'mobx'
export default class TestMobx {
	constructor({isOpen, position, points} = {isOpen: false, position: {lat: -34.397, lng: 150.644}, points: [{ lat: 41.868998, lng: 123.5270885999999 },{ lat: 41.6689984, lng: 123.42708859999998 }]}) {
		this.isOpen = isOpen
	  this.position = position
	  this.points = points
	}

	@observable isOpen
	@observable position
	@observable points

	@computed get msg() {
		return `${this.name} say count is ${this.name}`
	}

	@action changeDrawerState() {
		this.isOpen = !this.isOpen
	}
	@action location(pos) {
		//console.log(pos)
		this.position = pos
	}

	toJson() {
		let	obj = toJS(this.points)
		let i = 0
		let arr = []
		for (i; i < obj.length; i++){
			arr.push(obj[i])
		}
    return {
      points: arr,
      position: toJS(this.position)
    }
  }
}