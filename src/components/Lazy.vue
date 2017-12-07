<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="../../static/js/masonry.pkgd.min.js"></script>
<template>
	<div class="all">
		<div class="list">
			<ul>				
				<li>
					<i class="iconfont yel">&#xe604;</i>
					<br>
					<p>良品购</p>					
				</li>
				<li class="shop" @click="testing">
					<i class="iconfont red">&#xe60a;</i><br>
					<p>购物车</p>
				</li>
							
				<li>
					<i class="iconfont deepyel">&#xe635;</i><br>
					<p>美食菜谱</p>
				</li>
				<li>
					<i class="iconfont green">&#xe695;</i><br>
					<p>家居生活</p>
				</li>
				<li class=" bottom">
					<i class="iconfont orange">&#xe65b;</i><br>
					<p>壁纸</p>
				</li>
				<li class=" bottom">
					<i class="iconfont pink">&#xe658;</i><br>
					<p>头像</p>
				</li>
				<li class=" bottom">
					<i class="iconfont purple">&#xe646;</i><br>
					<p>表情</p>
				</li>
				<li class=" bottom">
					<i class="iconfont blue">&#xe7b8;</i><br>
					<p>更多分类</p>
				</li>
			</ul>
		</div>
		<div class="box">
			<ul>
				<li v-if="lData" v-for="item in lData">
					<router-link :to="{name:'Detail',params:{fid:item.id}}">
						<img :src="item.pics" alt="" :fid="item.id">
						<p class="first">{{item.msg}}</p>
						<p class="second"><i class="iconfont">&#xe61a;</i>{{item.like_count}}</p>
						<p class="third">{{item.username}}<br><span>收集到 {{item.name}}</span></p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
	
</template>
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js">
</script>
 <script>
	import axios from 'axios';
	export default{
		name:'lazy',
		data:function(){
			return{
				lData:null,
				pic:[
					{pics:'./static/img/1.jpeg'},
					{pics:'./static/img/2.jpeg'},
					{pics:'./static/img/3.jpeg'},
					{pics:'./static/img/4.jpeg'},
					{pics:'./static/img/5.jpeg'},
					{pics:'./static/img/6.jpeg'},
					{pics:'./static/img/7.jpeg'},
					{pics:'./static/img/8.jpeg'},
					{pics:'./static/img/9.png'},
					{pics:'./static/img/10.jpeg'},
					{pics:'./static/img/11.jpeg'},
					{pics:'./static/img/12.jpeg'},
					{pics:'./static/img/13.jpeg'},
					{pics:'./static/img/14.jpeg'},
					{pics:'./static/img/15.jpeg'},
					{pics:'./static/img/16.jpeg'},
					{pics:'./static/img/17.jpeg'},
					{pics:'./static/img/18.png'},
					{pics:'./static/img/19.jpeg'},
					{pics:'./static/img/20.jpeg'},
					]
			}
		},
		mounted:function(){
			this.getlData();
			this.waterFall()
		},
		created:function(){
		},
		methods:{
			getlData:function(){
				var that = this;
				axios.get('/napi/index/hot/?start=0&include_fields=sender%2Calbum&limit=24&_=1510704436630')
				  .then(function (res) {
				  	that.lData = res.data.data.object_list;
				  	for(var i=0;i<that.pic.length;i++){
				  		that.pic[i].msg = that.lData[i].msg;
				  		that.pic[i].like_count = that.lData[i].like_count;
				  		that.pic[i].name = that.lData[i].album.name;
				  		that.pic[i].username = that.lData[i].sender.username;
				  		that.pic[i].id = that.lData[i].id;
				  	}
				  	that.lData = that.pic
				    console.log(that.lData);
				  })
				  .catch(function (error) {
				    console.log(error);
			    });
			},
			waterFall:function () {
				window.onscroll=function(){
			        var boxes = document.querySelectorAll('.box ul li');
			        var colCount = Math.floor(window.innerWidth / 160);
			        var heightArr = [];
			        var minHeight, minIndex;
			        for (var i = 0; i < boxes.length; i++) {
			            if (i < colCount) {
			                //第一行
			                heightArr.push(boxes[i].offsetHeight);
			            } else {
			                //其他行
			                //找到最矮列
			                minHeight = Math.min.apply(Math, heightArr);
			                minIndex = heightArr.indexOf(minHeight);
			                //设定位置
			                boxes[i].style.position = 'absolute';
			                boxes[i].style.left = minIndex * boxes[minIndex].offsetLeft + 'px';
			                boxes[i].style.top = minHeight +0.03*minHeight+ 'px';
			                //更新高度
			                heightArr[minIndex] += boxes[i].offsetHeight;
			            }
			        }
				}
		    },
		    testing:function(){
		    	var u = localStorage.getItem("username")
		    	if (u!==null) {
		    		location.href="/#/shop"
		    	}else{
		    		alert('您还没有登录哦');
		    	}
		    	console.log(u)
		    	
		    	
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
	*{
		padding: 0;
		margin: 0;
	}
	.box ul{
		width: 100%;
		margin: 0 5%;
		box-sizing: border-box;
		list-style: none;
		background: #d5d5d5;
		position: relative;
	}
	.box ul li{
		width: 43%;
		float: left;
		border:1px solid #ccc;
		border-bottom: 2px solid #ccc;
		margin-bottom: 5px;
		/*margin-left: 5%;*/
	}
	/*.box ul li:nth-of-type(2n){
		margin-left: 8%;
	}*/
	.box ul li:nth-of-type(2){
		margin-left: 3%;
	}
	.box ul li img{
		width: 100%;
	}
	.first{
		font-size: 12px;
		color: #333;
	}
	.second{
		font-size: 12px;
		color: #aaa;
		padding: 5px 0;
	}
	.second i{
		font-size: 10px;
	}
	.third{
		border-top: 1px solid #ccc;
		font-size: 12px;
		color: #3d9cdd;
		padding: 5px 0;
	}
	.third span{
		color: #666;
	}
	.list i{
		font-size: 26px;
	}
	.yel{
		color: #f1c40f;
	}
	.red{
		color: #e74c3c;
	}
	.deepyel{
		color: #f39c12;
	}
	.green{
		color: #2ecc71;
	}
	.orange{
		color: #f60;
	}
	.pink{
		color: hotpink;
	}
	.purple{
		color: #8c5fc0;
	}
	.blue{
		color: #3498db;
	}
	.list ul li p{
		font-size: 14px;
		color: #888;
		margin-top: 4px;
	}
	.bottom{
		border-bottom: 1px solid #ccc;
	}
	.list ul{
		width: 100%;
		height: 180px;
	}
	.list ul li{
		width: 25%;
		float: left;
		list-style: none;
		height: 48%;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		box-sizing: border-box;
		padding-top: 5%;
	}
	a{
		text-decoration: none;
	}
</style>