<template>
	<div class="all">
		<!-- <router-link :to="{name:'Lazy'}"> -->
			<div class="header">
			<div class="inp l">
				<input type="text" @click="nosearch()" placeholder="搜索一下试试" ><i class="iconfont">&#xe60b;</i>
			</div>
			<router-link :to="{name:'Login'}">
				<div class="login r" ><i class="iconfont">&#xe658;</i>登录</div>
			</router-link>
			<router-link :to="{name:'Register'}">
				<div class="register r"><i class="iconfont">&#xe61a;</i>注册</div>
			</router-link>
		</div>
		<div class="caro">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="item in cDatas"> 
			  <div>
			  	<img :src="item.url" alt="">
			  	<div class="little">{{item.timestamp}}</div>
			  	<div class="font">{{item.title}}</div>
			  </div>
			  </mt-swipe-item>
		    </mt-swipe>
		</div>
		
		<!-- </router-link> -->
	</div>
</template> 
<script>
	import axios from 'axios';
	export default{
		name:'carousel',
		data:function(){
			return{
				img:[{url:'../../static/images/1.jpeg'},
					 {url:'../../static/images/2.jpeg'},
					 {url:'../../static/images/3.jpeg'},
					 {url:'../../static/images/4.jpeg'},
					 {url:'../../static/images/5.jpeg'}
				],
				cDatas:null
			}
		},
		mounted:function(){
			this.getcData()
		},
		methods:{
			getcData:function(){
				var that = this;
				axios.get('/napi/mbanner/?app_code=mdt')
				.then(function (res) {
					that.cData = res.data.data.object_list;
					for(var i=0;i<that.img.length;i++){
						that.img[i].title = that.cData[i].title
						that.img[i].timestamp = that.cData[i].timestamp.replace('00:00:00','');
					}
					that.cDatas = that.img;
				  console.log(that.img);
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			nosearch:function(){
				alert('登陆之后才能使用搜索功能哦')
			}
		}
	}
</script>
<style scoped>
	@font-face {
	  font-family: 'iconfont';
	  src: url('../../font/iconfont.eot');
	  src: url('../../font/iconfont.eot?#iefix') format('embedded-opentype'),
	  url('../../font/iconfont.woff') format('woff'),
	  url('../../font/iconfont.ttf') format('truetype'),
	  url('../../font/iconfont.svg#iconfont') format('svg');
	}
	.iconfont{
	  font-family:"iconfont" !important;
	  font-style:normal;
	  -webkit-font-smoothing: antialiased;
	  -webkit-text-stroke-width: 0.2px;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.header{
		width: 100%;
		height: 45px;
		color: #fff;
		background: url(../../static/images/logo.png) no-repeat center, #f25555;
	}
	.l{
		float: left;
	}
	.r{
		float: right;
		line-height: 45px;
		font-size: 16px;
		padding-right: 10px;
	}
	.caro{
		height: 232px;
		position: relative;
	}
	.caro img{
		width: 100%;
		height: 100%;
	}
	html,body{
		height: 100%;
	}
	.font{
		color: #fff;
		font-size: 20px;
		position: absolute;
		left: 0;
		bottom: 10%;
		padding-left: 15px;
	}
	.little{
		color: #fff;
		font-size: 14px;
		position: absolute;
		left: 0;
		bottom: 20%;
		padding-left: 15px;
	}
	.inp{
		padding: 13px 3px;
	}
	input{
		float: left;
		width: 45%;
		outline: none;
		border-radius: 5px;
		border: 0;
		padding-left: 5px;
		color: #666;
	}
	.inp i{
		float: left;
		margin-left: 5px;
	}
	.header i{
		font-size: 16px;
	}
	a{
		text-decoration: none;
		color: #fff;
	}
	
</style>