<template>
	<div>
		<carousel></carousel>
		<!-- {{this.$route.params.fid}}<br>	 -->
		<div class="det" v-if="dData">
			<img src="../../static/img/15.jpeg" alt=""><br>
			<p class="first" >{{dData.msg}}</p>
			<p class="second">
				<i class="iconfont">&#xe61a;</i>
				<span class="price">{{dData.album.favorite_count}}</span>
			</p>
			<p class="third">{{dData.sender.username}}<br><span>收集到 {{dData.album.name}}</span></p>
			
		</div>
		<p class="fourth">
			<span class="add" @click="add()">加入购物车</span>
		</p>
		<section></section>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		name:'detail',
		data:function(){
			return{
				dData:null,
				pic:[
					{pics:'./static/img/20.jpeg'},
					]
			}
		},
		mounted:function(){
			this.getdData()
		},
		methods:{
			getdData:function(){
				var u = localStorage.getItem("username")
				var that = this;
				axios.get(`/napi/blog/detail/?include_fields=top_like_users,top_forward_users,top_like_users,tags,top_comments,related_albums,extra_links,related_albums.covers,root_album,share_links,share_info,atest_events,extra_html&blog_id=${this.$route.params.fid}`)
				.then(function(res){
					that.dData = res.data.data;
				  	that.dData.pic = that.pic
				  	console.log(that.dData)
				})
				.catch(function (error) {
				    console.log(error);
			    });

			},
			add:function(){
				var u = localStorage.getItem("username")
				console.log(u)
				if (u!==null) {
					axios.post('/api/login/createProduct',{
						name : this.dData.msg,
						price : this.dData.album.favorite_count

					})
					.then(function (res) {
						
					  console.log(res);
					  alert(res.data.message)
					})
					.catch(function (error) {
					  console.log(error);
					});
				}else{
					alert('您还没有登陆')
				}
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
	.det{
		margin: 0 8%;
		text-align: center;
		border: 1px solid #ccc;
		border-bottom: 3px solid #ccc;
		margin-top: 15px;
	}
	.det img{
		width: 100%;
	}
	section{
		width: 100%;
		height: 50px;
	}
	.first{
		font-size: 14px;
		color: #333;
	}
	.second{
		font-size: 14px;
		color: #aaa;
		padding: 5px 0;
	}
	.second i{
		font-size: 10px;
	}
	.third{
		border-top: 1px solid #ccc;
		font-size: 16px;
		color: #3d9cdd;
		padding: 5px 0;
		font-weight: bold;
	}
	.third span{
		color: #666;
		font-size: 14px;
		font-weight: lighter;
	}
	.fourth span{
		margin-top: 10px;
		display: inline-block;
		background: #f60;
		color: #fff;
		padding: 0 5px;
		border-radius: 5px;
	}
</style>