<template>
	<div>
		<div class="header">			
		</div>
		<div class="main">
			<p class="first">登录</p>
			<input type="text" id="inputEmail3"class="username form-control" placeholder="请输入用户名" v-model="username"><br>
			<input type="text" id="inputPassword3" class="form-control pw" placeholder="请输入密码" v-model="pw"><br>
			<p class="second"  @click="login"><span>点击登录</span></p>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
 export default {
    data() {
        return {
            username : '',
            pw : ''
        }
    },
    methods:{
       login() {
        // 获取已有账号密码
        axios.post('/api/login/getAccount',{username : this.username,
              pw : this.pw})
          .then((response) => {
            // 响应成功回调
            console.log(response)
            // let params = { 
              
            // };
            alert(response.data.message)
            if (response.data.code===1) {
            	localStorage.setItem("username",this.username)
            	location.href="/#/homes"
            }
            //小何阳傻
            // 创建一个账号密码
            // return axios.post('/api/login/createAccount',params);
          })
          .then((response) => {
            console.log(response)
            // alert(response.message)
          })
          .catch((reject) => {
            console.log(reject)
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
	.pw{
		/*border-top: 0;*/
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