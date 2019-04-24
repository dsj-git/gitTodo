<template>
	<div class="address">
		<div class="addState">
			<div class="current">地址确认<span></span></div>
			<div>查看订单<span></span></div>
			<div>支付<span></span></div>
			<div>订单确认<span></span></div>
		</div>
		<div class="addAdd">
			<div class="default" v-for="(item,index) in filterAddress" :key="index" :class="{check: index == current}" @click="choose(index)">
				<p class="name">{{item.username}}</p>
				<p class="local">{{item.streetName}}</p>
				<p class="tel">{{item.tel}}</p>
				<div class="edit"><button>编辑</button></div>
				<div class="del"><button @click="del(index)">删除</button></div>
				<p v-if="!item.isDefault">
					<a class="setTacit" @click="setDefault(item.addressId)">设为默认</a>
				</p>
				<p v-if="item.isDefault">默认地址</a></p>
			</div>
			<div class="default addBtn">
				<span>+</span>
				<p class="addText">添加新地址</p>
			</div>
		</div>
		<div class="more"><a @click="limitNum=addressList.length">more⬇</a></div>
		<div class="shipping" style="text-align: center;">
			<p>配送方式</p>
			<ul>
				<li :class="{check: shippingMethod == 1}" @click="shippingMethod=1">包邮</li>
				<li :class="{check: shippingMethod == 2}" @click="shippingMethod=2">智能收费180元</li>
			</ul>
		</div>
		<div class="addSure"><button @click="$router.push('/add')">确认付款</button></div>
	</div>
</template>

<script>
	export default {
		name: 'Address',
		data(){
			return{
				//addressList: [],//如果调用json数据，需要建立一个空数组
				addressList: [
					{
						addressId: '1001',
						username: '龚',
						streetName: '浙江省杭州市余杭区',
						postCode: '1001',
						tel: '18868686868',
						isDefault: true
					},{
						addressId: '1002',
						username: '村村',
						streetName: '浙江省杭州市余杭区',
						postCode: '1002',
						tel: '18868686868',
						isDefault: false
					},{
						addressId: '1003',
						username: '龚好好',
						streetName: '浙江省杭州市余杭区',
						postCode: '1003',
						tel: '18868686868',
						isDefault: false
					},{
						addressId: '1004',
						username: '好好',
						streetName: '浙江省杭州市余杭区',
						postCode: '1004',
						tel: '18868686868',
						isDefault: false
					},{
						addressId: '1005',
						username: '好好',
						streetName: '浙江省杭州市余杭区',
						postCode: '1005',
						tel: '18868686868',
						isDefault: false
					}
				],
				limitNum: 3,
				current: '',
				shippingMethod: 1
			}
		},
		mounted(){
			this.$nextTick(function(){
				//调用获取json的方法
				//this.getAddressList()
			})
		},
		methods:{
			//获取json数据
	// 		getAddressList(){
	// 			var _this = this;
	// 			this.$http.get("data/address.json").then(function(response){
	// 				var res = response.data;
	// 				if(res.status === '0'){
	// 					_this.addressList = res.result;//result就是json里面的数组名称
	// 				}
	// 			})
	// 		},
			choose(index){
				this.current = index;
			},
			//设置默认地址
			setDefault(addressId){
				this.addressList.forEach(function(address,index){
					if(address.addressId == addressId){
						address.isDefault = true;
					}else{
						address.isDefault = false
					}
				})
			},
			//删除地址，splice把原数组的东西删除
			del(index){
				this.addressList.splice(index,1)
			}
		},
		computed:{
			//过滤，只显示前三条，多的隐藏
			filterAddress(){
				//返回的是一个新数组
				return this.addressList.slice(0,this.limitNum)
			}
		}
	}
	
</script>

<style>
	.address{
		width: 1200px;
		height: 100%;
		min-height: 600px;
		margin: 30px auto;
	}
	.addState, .addAdd{
		margin-bottom: 30px;
		display: flex;
	}
	.addState{
		flex-flow: nowrap;
	}
	.addAdd{
		flex-flow: wrap;
	}
	.addState div{
		border-bottom: 3px solid #ddd;
		flex: 1;
		text-align: center;
		position: relative;
		padding-bottom: 10px;
	}
	.addState div span{
		position: absolute;
		display: inline-block;
		left: 50%;
		top: 28px;
		width: 10px;
		height: 10px;
		border-radius: 5px;
		background: #ddd;
	}
	.addState .current{
		border-color: lightcoral;
		color: lightcoral;
	}
	.addState .current span{
		background: lightcoral;
	}
	.addAdd>div{
		margin: 10px;
		border: 2px solid #ddd;
		padding: 10px 15px;
		min-width: 220px;
	}
	.default{
		position: relative;
	}
	.default .edit,.default .del{
		position: absolute;
		right: 10px;
	}
	.default .edit{
		top: 10px;
	}
	.default .del{
		bottom: 10px;
	}
	.addAdd button{
		width: 40px;
		height: 20px;
	}
	.default p{
		margin-bottom: 10px;
	}
	.default .name{
		font-size: 18px;
	}
	.default .local{
		font-size: 14px;
		margin-bottom: 20px;
	}
	.default .tel{
		font-size: 12px;
		color: #999;
	}
	.setTacit{
		color: lightcoral;
		cursor: pointer;
	}
	.default:hover,
	.default.check,
	.shipping .check{
		border-color: lightcoral;
	}
	.addAdd .addBtn{
		text-align: center;
		padding-top: 20px;
	}
	.addAdd .addBtn span{
		font-size: 24px;
	}
	.addBtn .addText{
		text-align: center;
	}
	.more{
		text-align: center;
		margin-bottom: 20px;
	}
	.more a{
		color: lightcoral;
	}
	/*配送方式*/
	ul{
		width: 100%;
		height: 100px;
		margin: 20px auto;
	}
	.shipping li{
		display: inline;
		border: 2px solid #ddd;
		margin: 20px;
		padding: 10px 20px;
		cursor: pointer;
	}
	.shipping li span{
		display: inline-block;
	}
	.addSure{
		float: right;
	}
	.addSure button{
		border: 2px solid lightcoral;
		background: #fff;
		padding: 8px 15px;
		font-size: 16px;
	}
</style>
