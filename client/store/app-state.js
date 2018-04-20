import { observable, computed, autorun, action } from 'mobx'

export default class TestMobx {
	@observable count = 0
	@observable name = 'wudi'
	@computed get msg() {
		return `${this.name} say count is ${this.count}`
	}
	@action add(n) {
		this.count += n
	}
}