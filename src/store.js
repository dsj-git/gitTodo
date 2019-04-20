import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
	state:{
		userInfo: {},
		cartList: {}
	},
	//改变状态的方法集
	mutations: {
		addItem (state,value){
			state.list.push(value) 
		},
		getUserInfo(state,userinfo){
			state.userInfo=userinfo;
		},
		getList(state,item)
		{
			state.cartList=item;
		}
		
	},
	actions: {
		
	}
})

export default store