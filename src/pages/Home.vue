<template>
	<div class="home">
		<router-view />
		<ul class="footer">
			<li class="icons">
				<router-link :to='{name: "list"}'>商品列表</router-link>
			</li>
			<li class="icons">
				<router-link :to='{name: "cart"}'>购物车</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'home'
	}
</script>

<style>
	.home{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		border-top: 1px solid lightseagreen;
		font-size: 18px;
		margin-bottom: 0;
		display: flex;
		flex-flow: row nowrap;
		justify-content:space-around;
	}
	.footer .icons{
		text-align: center;
		flex: 1;
		background: #eee;
	}
	.footer a{
		display: block;
	}
	a{
		color: #000;
		text-underline: none;
	}
	a:hover{
		text-underline: none;
	}
	.active{
		background: lightseagreen;
		color: #fff;
	}
	
</style>
