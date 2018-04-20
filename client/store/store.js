import TestMobxClass from './app-state'

export const TestMobx = TestMobxClass

export default {TestMobx}

//SSR专用
export const createStore = () => {
	return {
		testMobx: new TestMobx()
	}
}