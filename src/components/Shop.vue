<template>
	<div class="all">
		<div class="header">
			购物车
		</div>
		<div class="shop">
			<table>
				<thead>
					<tr>
						<th>选择</th>
						<th class="second">商品名</th>
						<th>价格</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody >
					<tr v-for="item in shopData">
						<td><input type="checkbox" class="change" @click="changeone"></td>
						<td>{{item.name}}</td>
						<td class="price">{{item.price}}</td>
						<td class="del" @click="del(item._id)">删除</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="allselect">
			<input type="checkbox" class="allcheck" @change="changetwo">全选
		</div>
		<div class="result">
			总价:
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data:function(){
			return{
				name:'shop',
				shopData:[],
				id:'',
				sum:0
			}			
		},
		mounted:function(){
			this.getshopData()
			// this.changeone()
		},
		methods:{
			getshopData:function(){
				var that = this;
				axios.post('/api/login/shop')
			  	.then(function (res) {
			  		var length = res.data.data.length
			  		that.shopData = res.data.data
			  		// console.log(that.shopData)
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});	  		
			},
			del:function(id){
				var that = this;
				if (!confirm('是否删除?')) {
			        return;
		      	}
		      	console.log(that.shopData)
		      	axios.post('/api/login/del',{id:id})
			  	.then(function (res) {			  	
					console.log(res.data.code)
					if (res.data.code===1) {
						location.reload(true)
					}else{
						alert(res.data.message)
					}
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
			},
			changeone:function(e){
				// console.log()
				var temp = e.currentTarget;
				// $('.allcheck').change(function(){
			 //        var checked = $(this).prop('checked');
			 //        $('.change').prop('checked',checked);
			 //    })
			    $(temp).change(function(){	
			        var count = $('.change:checked').length;
			        var allCount = $('.change').length;
			        $('.allcheck').prop('checked',count===allCount);	
			        }			        
			    )
		    	var total = $(temp).parents('tr').find('.price').html();
	    		var number = parseInt(total);
	    		if ($(temp).prop('checked')) {	
	    			this.sum +=number;	    		
		    	}
		    	else{
		    		this.sum -= number;
		    	}
		    	$('.result').html('总价: '+this.sum +'元')
			},
			changetwo:function(){
				var that = this
				var total;
				var checked = $('.allcheck').prop('checked')
				$('.change').prop('checked',checked)
				var number=0;
				that.sum = 0;
				if ($('.allcheck').prop('checked')) {

					$('.price').each(function(){
						total = $(this).html()
						number = parseInt(total)
						that.sum += number;
					})
				}else{
					that.sum -= number;
					if (that.sum < 0) {
						that.sum = 0
					}			
				}	
				$('.result').html('总价: '+that.sum +'元')			
			}
		}
	}
</script>
<style scoped>
	.all{
		width: 100%;
		height: 1000px;
		background: #eb5353;
	}
	.second{
		width:50%;
	}
	tbody tr{
		height: 100px;
		;
	}
	.header{
		color: #fff;
		font-size: 20px;
	}
	.shop{
		margin: 0 2%;
		background: #fff;
		border:1px solid #ccc;
	}
	table{
		width: 100%;
	}
	.del{
		color: #5698c4
	}
	.allselect{
		text-align: left;
		color: #fff;
		font-size: 20px;
	}
	.allselect input{
		margin-left: 25px
	}
	.result{
		font-size: 20px;
		color: #fff;
	}
</style>