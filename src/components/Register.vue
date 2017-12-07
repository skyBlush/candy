<template>
	<div>
		<div class="header">			
		</div>
		<div class="main">
			<p class="first">注册</p>
			<input type="text" class="username" placeholder="请输入用户名" v-model="username"><br>
			<input type="text" class="pw" placeholder="请输入密码" v-model="pw"><br>
			<input type="text" class="em" placeholder="请输入邮箱" v-model="em">
			<p class="second" @click="getRegist"><span>点击注册</span></p>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
	export default{
		name:'register',
		data:function(){
			return{
				// register:null
			}
		},
		mounted:function(){
			// this.getRegist()
		},
		methods:{
			getRegist:function(){
				var that = this;
				axios.post('/api/register/createAccount',{
					username : this.username,
					pw : this.pw,
					em : this.em
				})
				.then(function(res){
				  	console.log(res)
				  	// that.register = res
				  	alert(res.data.message)
				  	if (res.data.code===1) {
				  		location.href = "/#/login"
				  	}				  	
				})
				.catch(function (error) {
				    console.log(error);
			    });
			}
		}
	}
</script>
<style scoped>
	.header{
		width: 100%;
		height: 45px;
		background: url(../../static/images/logo.png) no-repeat center #eb5353;
	}
	.main{
		margin: 20px 8%;
		border:1px solid #ccc;
		border-right: 3px solid #ccc;
		border-bottom: 3px solid #ccc;
		padding: 20px 0;
	}
	input{
		width: 90%;
		height: 35px;
		border: 1px solid #c8c8c8;
		background: #f8f8f8;
		padding-left: 5px;
		box-sizing: border-box;
		/*outline: #8bc4eb*/
	}
	.username{
		border-radius: 5px 5px 0 0;
		border-bottom: 0;
	}
	.em{
		border-top: 0;
		border-radius: 0 0 5px 5px ;
	}
	.first{
		color: #8bc4eb;
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 12px;
	}
	.second span{
		width: 80%;
		height: 26px;
		line-height: 26px;
		border-radius: 15px;
		background: #42c02e;
		color: #fff;
		font-size: 16px;
		display: inline-block;
		margin: 10px 0;
	}
</style>