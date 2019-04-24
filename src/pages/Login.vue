<template>
	<div class="login">
		<form class="form-horizontal" v-if="!isReg">
			<div class="form-group">
				<label class="col-sm-3 control-label">账号：</label>
				<div class="col-sm-9">
					<input class="form-control" type="text" v-model="name" placeholder="请输入用户名" v-focus>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label">密码：</label>
				<div class="col-sm-9">
					<input class="form-control" type="password" v-model="password" placeholder="请输入密码">
				</div>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-success" @click="login()">登录</button>
				<button type="button" class="btn btn-dafult" @click="reg()">注册</button>
			</div>
		</form>
		<form class="form-horizontal" v-else>
			<div class="form-group">
				<label class="col-sm-3 col-xs-3 control-label">账号：</label>
				<div class="col-sm-9 col-xs-5">
					<input class="form-control" @blur="checkName()" name="regname" type="text" placeholder="请输入用户名" v-model.trim="name">
				</div>
				<span>{{msgname}}</span>
			</div>
			<div class="form-group">
				<label class="col-sm-3 col-xs-3 control-label">密码：</label>
				<div class="col-sm-9 col-xs-5">
					<input class="form-control" @blur="checkPwd()" name="pwd" type="password" placeholder="请输入密码" v-model.trim="password">
				</div>
				<span>{{msgpwd}}</span>
			</div>
			<div class="form-group">
				<label class="col-sm-3 col-xs-3 control-label">确认密码：</label>
				<div class="col-sm-9 col-xs-5">
					<input class="form-control" @blur="repeatPwd()" type="password" placeholder="请再次输入密码" v-model.trim="repeat">
				</div>				
				<span>{{msgpwd2}}</span>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-success" @click="addUser()">确定</button>
				<button type="button" class="btn btn-dafult" @click="cancel()">取消</button>
			</div>
		</form>
	</div>
</template>

<script>
	import md5 from 'js-md5'
	import {mapState,mapMutations} from 'vuex'
	export default{
		name: 'Login',
		data(){
			return{
				isReg: false,
				name: '',
				password: '',
				repeat: '',
				msgname: '',
				msgpwd: '',
				msgpwd2: '',
				formdata:{
					Account:'',
					Password:''
				}
			}
		},
		//自定义指令
		directives:{
			//当被绑定的元素插入到DOM中时。。。
			focus:{
				inserted(el){
					//聚焦元素
					el.focus()
				}
			}
		},
		computed:{
			...mapState(['userInfo']),
		},
		methods:{
			...mapMutations(['getUserInfo']),
			login(){
				if(localStorage.getItem("name") === this.name && localStorage.getItem("password") === this.password){
					this.formdata.Account = this.name;
					this.formdata.Password = this.password;
					this.$store.commit('getUserInfo',this.formdata);
					console.log(localStorage.getItem("name")+  "+" + localStorage.getItem("password"));
					console.log(this.name + this.password);
					this.$router.push('/home/list')
				}else{
					alert('请输入用户名和密码')
				}
// 				let postdata=this.formdata;
// 				postdata.Password= md5(postdata.Password);
// 				this.$http.login(postdata).then((res)=>{
// 					if(res.success){
// 						//设置token
// 						entourage.setToken(res.obj.token);
// 						this.$store.commit('setUserInfo',res.obj);
// 						console.log(res.obj);
// 						this.$router.push('/home/list')
// 					}else{
// 						alert('用户名密码不正确')
// 					}
// 				})
			},
			reg(){
				this.isReg = true;
				//document.getElementsByName("regname")[0].focus();
			},
			//判断用户名字符长度
			getLength(str){
				return str.replace("/[^\x00-xff]/g","xx").length;//汉字，一个字代表两个字符;x00-xff单字节
			},
			//判断密码使用相同字符
			findStr(str,n){	//两个参数：字符串，要对比的字符
				let tmp = 0;
				for(var i=0;i<str.length;i++){
					if(str.charAt(i) == n){
						tmp ++;
					}
				}
				return tmp;
			},
			checkName(){
				let nameLen = this.getLength(this.name);
				//console.log(nameLen);
				if(nameLen == 0){
					this.msgname = "用户名不能为空"
				}else if(nameLen < 6){
					this.msgname = "用户名至少6个字符"
				}else if(nameLen > 25){
					this.msgname = "用户名不能超过25个字符"
				}else{
					this.msgname = ''
				}
			},
			checkPwd(){
				let pwd = this.password;
				let m = this.findStr(pwd,pwd[0]);
				let re_n = /[^\d]/g;//不是数字
				let re_t = /[^a-zA-Z]/g;//不是字母
				//console.log(pwd.length);
				if(pwd.length == 0){
					this.msgpwd = "密码不能为空"
				}else if(pwd.length>5){
					this.msgpwd = "密码强度为中"
				}else if(pwd.length>10){
					this.msgpwd = "密码强度为高"
				}else if(pwd.length<5){
					this.msgpwd = "密码强度为低"
				}else if(pwd.length == m){
					this.msgpwd = "不能使用相同字符"
				}else if(pwd.length<6 || pwd.length>16){
					this.msgpwd = "密码长度应为6-16个字符"
				}else if(!re_n.test(pwd)){
					this.msgpwd = "不能全为数字"
				}else if(!re_t.test(pwd)){
					this.msgpwd = "不能全为字母"
				}else{
					this.msgpwd = ""
				}
			},
			repeatPwd(){
				if(this.password != this.repeat){
					this.msgpwd2 = '两次密码输入不一致';
					document.getElementsByName('pwd')[0].focus();
					this.password = '';
					this.repeat = ''
				}
			},
			addUser(){
				if(this.password === this.repeat){
					localStorage.setItem("name",this.name);
					localStorage.setItem("password",this.password);
					this.name = '';
					this.password = '';				
					this.repeat = '';				
					this.isReg = false;
					console.log(localStorage.getItem("name")+  "+" + localStorage.getItem("password"));
					this.$router.push('/home/list');
				}
			},
			cancel(){
				this.isReg = false
			}

		},
}
</script>

<style>
	.login{
		width: 500px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20%;
	}
	.btn-success{
		margin-left: 30px;
		margin-right: 30px;
	}
</style>
