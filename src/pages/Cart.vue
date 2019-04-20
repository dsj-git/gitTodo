<template>
	<div class="cart table-responsive">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th></th>
					<th>商品ID</th>
					<th>商品名称</th>
					<th>单价</th>
					<th>数量</th>
					<th>合计</th>
					<th>编辑</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in cartLists" :key="index">
					<td><input type="checkbox" :checked="item.isChecked" :value="index" @click="choose(item)"></td>
					<td>{{item.id}}</td>
					<td>{{item.goodsName}}</td>
					<td>{{item.unitPrice}}</td>
					<td class="input-group">
						<div @click="changeUnit(item,1)" class="input-group-addon">+</div>
						<input type="number" v-model.number="item.quantity" class="form-control">
						<div @click="changeUnit(item,-1)" class="input-group-addon">-</div>
					</td>
					<td>{{item.unitPrice*item.quantity | formateMoney}}</td>
					<td><button class="del" @click="handleDel(index)">删除</button></td>
				</tr>
			</tbody>
		</table>
		<div class="total">
			<div><label><input type="checkbox" @click="selectAll" v-model="checked">&nbsp;&nbsp;全选</label></div>
			<div class="settle">
				<span :style="{marginRight: '10px'}">件数：{{totalCount}}</span>| 
				<span :style="{fontWeight: 'bold'}">合计：{{totalMoney | formateMoney('元')}}</span>
				<button @click="address">结算</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		name: 'cart',
		data(){
			return{
				cartLists: [],
				checked: false,
				current: '',
				totalMoney: 0,
				totalCount: 0
			}
		},
		mounted() {
			this.cartLists = this.cartList;
			console.log(this.cartLists)
		},
		computed: {
			...mapState(['cartList','userInfo'])
		},
		filters:{
// 			formateMoney(value,type){
// 				return "￥" + value.toFixed(2) + type;
// 			},
			formateMoney(value,type){
				return "￥" + value.toFixed(2);
			}
		},
		methods:{
			...mapMutations(['getUserInfo','getList']),
			//监听全选状态的checked变化
			selectAll(){
				let _this = this;
				if(!_this.checked){
					_this.cartLists.forEach(function(value){
						value.isChecked = true;
					})
				}else{
					_this.cartLists.forEach(function(value){
						value.isChecked = false;
					})
				}
				this.calTotal();				
				this.claCount();
			},
			//监听列表中的checked的状态
			choose(item){
				var _this = this;
				var num = 0;
				if(typeof item.isChecked == "undefined"){
					this.$set(item,"isChecked",true);
				}else{
					item.isChecked = !item.isChecked;
				};
				this.cartLists.forEach(function(item,value){
					if(item.isChecked){
						num ++
					}
				});
				if(num == _this.cartLists.length){
					this.checked = true
				}else{
					this.checked = false;
				}
				this.calTotal();
				this.claCount();
			},
			//删除数据
			handleDel(index){
				this.cartLists.splice(index,1);
				this.calTotal();
				this.claCount();
			},
			//结算指向地址页面
			address(){
				this.$router.push('/address')
			},
			//数量变化
			changeUnit(item,type){
				if(type>0){
					item.quantity ++
				}else{
					item.quantity --;
					if(item.quantity < 1){
						item.quantity = 1;
					}
				};
				this.calTotal();
				this.claCount();
			},
			//計算金额和件数，要在四个地方调用，当增加或者减少数量时，删除列表项时，选中列表的checkbox，还有一种是全选的时候
			calTotal(){
				let _this = this;
				this.totalMoney = 0;
				_this.cartLists.forEach(function(value){
					if(value.isChecked){
						_this.totalMoney += value.quantity * value.unitPrice;
					};
				});
			},
			//计算件数
			claCount(){
				let _this = this;
				this.totalCount = 0;
				_this.cartLists.forEach(function(value){
					if(value.isChecked){
						_this.totalCount += value.quantity;
					};
				});
			}
		},
	}
</script>

<style>
	.cart{
		width: 1000px;
		margin: 20px auto;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		appearance: none; 
		margin: 0; 
	}
	.cart .form-control{
		width: 50px;
		text-align: center;
	}
	.cart .input-group-addon{
		width: auto;
		cursor: pointer;
	}
	.cart .input-group{
		border: none;
	}
	.button{
		border-radius: 0!important;
	}
	.total{
		position: fixed;
		bottom: 40px;
		left: 0;
		width: 100%;
		display: flex;
		flex-flow: nowrap;
		font-size: 18px;
		border-top: 1px solid #999;
		padding-top: 10px;
	}
	.total div{
		flex: 1;
	}
	
	label{
		margin-left: 30px;
	}
	.total .settle{
		margin-right: 30px;
		text-align: right;
	}
	.settle button{
		margin-left: 30px;
		padding: 5px 10px;
		font-size: 16px;
	}
</style>
