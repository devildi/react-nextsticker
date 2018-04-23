import { observable, computed, autorun, action } from 'mobx'

export default class TestMobx {
	constructor({count, name} = {count: 1, name: 'wudi'}) {
		this.count = count
	  this.name = name
	}
	@observable count
	@observable name
	@computed get msg() {
		return `${this.name} say count is ${this.count}`
	}
	@action add(n) {
		this.count += n
	}
	toJson(){
		return {
			count: this.count,
			name: this.name
		}
	}
}