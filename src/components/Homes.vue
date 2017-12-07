<template>
	<div>
		<div class="all">
			<!-- <router-link :to="{name:'Lazy'}"> -->
				<div class="header">
				<div class="inp l">
					<input type="text" @focus="focus()" placeholder="搜索一下试试" ><i class="iconfont">&#xe60b;</i>
				</div>
				<!-- <router-link :to="{name:'Login'}"> -->
				<!-- </router-link> -->
				<!-- <router-link :to="{name:'Home'}"> -->
					<div class="register r" @click="zero">注销</div>
				<!-- </router-link> -->
					<div class="login r" >欢迎你</div>
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
		<div class="search">
			<input type="text" placeholder="请输入你想搜索的内容" v-model="condition">
			<i class="iconfont">&#xe60b;</i>
			<div class="result" v-for="item in lData" v-if="item.msg.indexOf(condition) != -1" >
				{{item.msg}}
			</div>
			<div class="returned" @click="returned()">点我返回</div>
		</div>
		<lazy></lazy>			
	</div>
</template>
<script>
	import axios from 'axios';
	export default{
		name:'homes',
		data:function(){
			return{
				img:[{url:'../../static/images/1.jpeg'},
					 {url:'../../static/images/2.jpeg'},
					 {url:'../../static/images/3.jpeg'},
					 {url:'../../static/images/4.jpeg'},
					 {url:'../../static/images/5.jpeg'}
				],
				cDatas:null,
				lData:null,
				condition:""
			}
		},
		mounted:function(){
			this.getcData()
			this.getlData()
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
				  // console.log(that.img);
				})
				.catch(function (error) {
				  console.log(error);
				});
				var u = localStorage.getItem("username")
				console.log(u)
				document.querySelector('.login').innerHTML = '欢迎你' + u;
			},
			getlData:function(){
				var that = this;
				axios.get('/napi/index/hot/?start=0&include_fields=sender%2Calbum&limit=24&_=1510704436630')
				  .then(function (res) {
				  	that.lData = res.data.data.object_list;
				    console.log(that.lData);
				  })
				  .catch(function (error) {
				    console.log(error);
			    });
			},
			focus:function(){  
				document.querySelector('.search').style.display = 'block'
			},
			returned:function(){
				document.querySelector('.search').style.display = 'none'
			},
			zero:function(){
				localStorage.removeItem("username")
				location.href="/#/"
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
	.search{
		width: 80%;
		height: 100%;
		position: fixed;
		z-index: 500;
		display: none;
		background: #eb5353;
		top: 0;
		left: 0;
		padding: 0 10%;
		box-sizing: border-box;
		/*transition: all 0s linear 0.5s;*/
	}
	.search input{
		width: 100%;
		height: 30px;
		margin-top: 30px;
	}
	.returned{
		color: #fff;
		font-size: 18px;
		position: absolute;
		bottom: 20%;
		right: 10%;
	}
	.search i{
		margin-top: 50px;
		font-size: 40px;
		color: #fff;
		
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