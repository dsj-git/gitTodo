<template>
	<div>
		<div class="text-center">
			<h1>Come on!!</h1>
			<h2>As a man sows,so he shall reap.</h2>
		</div>
		<div class="radio-wrap">  
			<div class="nav nav-tabs" v-model="tabView">   
				<button v-for="(tab,index) in tabs" :class="['tab-button',{'active':iscur==index}]" @click="iscur=index,tabChange('select0' + (index + 1))">
					{{tab.name}}
				</button>  
			  </div>  
			  <keep-alive>   
				<component v-bind:is="tabView" class="tab"></component>  
			  </keep-alive>   
		</div>
	</div>
</template>

<script>
	import select01 from '../components/select01.vue'
	import select02 from '../components/select02.vue'
	export default{
		name: 'home',
		data () {  
			return {  
			  tabView: 'select01',
			  iscur: 0,   
			  tabs: [{name: "看我"}, {name: "再看我"}]
			}  
		},  
		components: {  
			select01,  
			select02
		},  
		methods: {  
			tabChange:function(tab){  
			  this.tabView = tab;  
			}  
		}  

	}
</script>

<style>
	.radio-wrap{
		width: 600px;
		margin: 20px auto;
	}
	.tab-button{
		padding: 6px 10px;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		border: 1px solid #ccc;
		cursor: pointer;
		background: #f0f0f0;
		margin-bottom: -1px;
		margin-right: -1px;
	}
	.tab-button:hover {
		background: #e0e0e0;
	}
	.tab-button.active {
		background: #e0e0e0;
	}
	.tab {
		border: 1px solid #ccc;
		padding: 10px;
		height: 100px;
	}
	
</style>
