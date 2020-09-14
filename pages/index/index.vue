<template>
	<view class="login">
		<Loadings :show="LoadingS"></Loadings>
		<view class="name">登录</view>
		  <input class="uni-input" v-model="changeValue" placeholder="输入账户" />
		  <input class="uni-input" v-model="password" placeholder="输入账户密码" />
		  <button type="primary" :loading="LoadingS" @click="loginIn">确定</button>
		  <view class="wchart-logo" style="display: none;">
			  <image src="../../static/img/Wchart.png" mode=""></image>
		  </view>
		  <image src="../../static/img/dl.png" mode="" class="login-bj" @click="get"></image>
	</view>
</template>

<script>
	import requireurl from '../../requist/requist.js'
	import Loadings from '../loading/loading.vue'
	
	export default {
		components:{
			Loadings
		},
		data(){
			return{
				changeValue:'',
				password:'',
				LoadingS:true
			}
		},
	    onReady: function (e) {
	       
	    },
		mounted() {
			_that.clearLoding()
		},
		created() {
			
		},
	    methods: {
	      loginIn(){
			if(this.initWord() === false)return
			var _that = this
			_that.runLoding()
			  wx.login({
				success (res) {
				  if (res.code) {
					  let obj = {
					  	  username : _that.changeValue,
					  	  password : _that.password,
					  	  code : res.code
					    }
					  requireurl.request('u/v1/wx/login/',obj,_that.userlogin,_that.errlogin)
				  } else {
					_that.LoadingS = false
					console.log('登录失败！' + res.errMsg)
				  }
				}
			  })
		  },
		  userlogin(e){
			  console.log(e)
			  this.clearLoding()
			  if(e.statusCode == 201){
				  this.clearLoding()
				  uni.setStorage({
				      key: 'storage_user',
				      data: e.data.token,
				      success: function () {
						  uni.redirectTo({
						      url: '../today/today'
						  });
				      }
				  });
			  }else{
				  wx.showToast({
				    title: e.data.msg,
					icon: 'none'
				  })
			  }
			  
		  },
		 
		 initWord(){
			 if(this.changeValue !== '' && this.password !== ''){
				 return true;
			 }else{
				 return false
			 }
		 },
		 
		  clearLoding(){
			this.LoadingS = false
		  },
		  runLoding(){
			this.LoadingS = true
		  }
	    },
		mounted() {
			this.clearLoding()
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
	}
	.login{
		width: 100%;
		height: 100%;
		position: relative;
		padding-top: 150upx;
		box-sizing: border-box;
	}
	.login-bj{
		width: 100%;
		height: 170upx;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	.name{
		font-size:48upx;
		color:rgba(46,46,46,1);
		margin:0 0 150upx 68upx ;
	}
	input{
		width:617upx;
		border-bottom:1upx solid rgba(221,221,221,1);
		margin: 0 auto;
		padding: 29upx 0;                                                                                                                                                                                                                                                                                                                  
		font-size:30upx;
		height: 40upx;
		color:rgba(153,153,153,1);
		margin-bottom: 50upx;
	}
	
	button{
		width:616upx;
		height:80upx;
		background:rgba(68,98,254,1) !important;
		border-radius:40upx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wchart-logo{
		
	}
	.wchart-logo image{
		width:80upx;
		height:80upx;
		display: block;
		margin: 120upx auto 0;
	}
</style>
