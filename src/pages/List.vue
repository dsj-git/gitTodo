<template>
	<div class="container">
		<div class="imgBox" v-for="(item,index) in lists">
			<img :src="item.imgPath" :alt="item.alt" >
			<div class="caption">
				<h3>{{item.goodsName}}</h3>
				<p>{{item.description}}</p>
				<p>{{item.unitPrice | formataMoney}}</p>
				<p><a class="btn btn-primary" @click="addCart(item)">加入购物车</a></p>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		name: 'list',
		data(){
			return{
				lists: [
					{	
						id: 1005,
						imgPath: '../static/img/logo.png',
						alt: "Vuejs",
						goodsName: "Vuejs课程",
						unitPrice: 289,
						quantity: 1,
						description: "这是一个渐进式js框架"
					},{	
						id: 1006,
						imgPath: '../static/img/boots.jpg',
						alt: "Bootstrap",
						unitPrice: 189,
						quantity: 1,
						goodsName: "Bootstrap课程",
						description: "简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。"
					},{	
						id: 1007,
						imgPath: '../static/img/logo.png',
						alt: "Vuejs",
						unitPrice: 389,
						quantity: 1,
						goodsName: "Vuejs进阶课程",
						description: "这是一个渐进式js框架"
					},{	
						id: 1008,
						imgPath: '../static/img/boots.jpg',
						alt: "Bootstrap",
						unitPrice: 399,
						quantity: 1,
						goodsName: "Bootstrap课程",
						description: "简洁、直观、强悍的前端开发框架，让web开发更迅速、简单。"
					}
				],
				sendLists: []
			}
		},
		filters:{
			formataMoney(value,type){
				return "￥" + value.toFixed(2);
			}
		},
		computed: {
			...mapState(['cartList','userInfo'])
		},
		methods:{
			...mapMutations(['getUserInfo','getList']),
			addCart(item){
				//findIndex对于空数组不会执行
				let sendItem = this.sendLists.filter(v => v.id == item.id)[0];
				if(sendItem){					
					sendItem.quantity ++ ;
				}else{					
					this.sendLists.push({...item, quantity: 1})
				}		
				this.$store.commit('getList',this.sendLists);
				//console.log(this.cartList);
			}
		}
		
	}
</script>

<style>
	.container{
		margin-top: 10px;
		margin-bottom: 40px;
		display: flex;
		flex-wrap: wrap;
	}
	.imgBox{
		width: 250px;
		border: 1px solid #ddd;
		border-radius: 4px;
		margin-bottom: 20px;
		padding: 5px;
		margin: 10px;
		line-height: 20px;
	}
	.imgBox img{
		width: 100px;
	}
	img{
		display: block;
		max-width: 100%;
		height: auto;
		vertical-align: middle;
		margin-right: auto;
		margin-left: auto;
	}
	.caption{
		padding: 9px;
		color: #333;
	}
</style>
