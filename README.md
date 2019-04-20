# cartgit

> this is my first cartgit xp[Croject

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```
##Login
利用js-md5加密密码
注册账号后存在本地，然后可以输入注册时的账号密码直接登录

#【正则表达式】
账号：数字、字母（不区分大小写），下划线、汉字
密码：密码长度应为6-16个字符，请使用字符加数字或符号的组合密码，不能单独使用字母、数字或符号

#【filters】
使用vue2.0的用法，通过过滤器给数字加单位或者保留两个小数点

#【filter】
商品列表页面，过滤重复项，本来想着用findIndex,但是查资料说它不支持空数组

#【store】
页面直接传值，商品列表加入到购物车

#【结算】
选中商品，全选商品

【增加或者减少商品数量】
只写一个方法即可，传入type值，判断type值来选择调用什么方法

##【地址页面】
flex布局

##？？[待解决问题]
信息弹出框，添加地址弹出框，编辑地址的功能

#[vue还有一些功能没有使用]
axios，vue-resource等等
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
