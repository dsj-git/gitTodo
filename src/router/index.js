import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Add from '@/pages/Add'
import Address from '@/pages/Address'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,//以上两个可以去除链接中的#号
	linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
		{
		  path: '/home',
		  name: 'home',
		  component: Home,
			children: [
				{
					path: 'list',
					name: 'list',
					component: () => import(/* webpackChunkName: "list" */ '@/pages/List.vue')
					//component: List
				},
				{
					path: 'cart',
					name: 'cart',
					component: () => import(/* webpackChunkName: "list" */ '@/pages/Cart.vue')
				}
			]
		},
		{
		  path: '/add',
		  name: 'add',
		  component: Add
		},
		{
		  path: '/address',
		  name: 'address',
		  component: Address
		}
  ]
})
