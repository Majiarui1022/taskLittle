<template>
	<view class="wechart">
		<Loadings :show="LoadingS"></Loadings>
		<image src="../../static/img/kflogo.png" mode=""></image>
		 <button class="wxlogin"  @click="loginIn" type="primary" :loading="LoadingS">微信快速登录</button>
		 <view class="bot-name">本小程序仅供控福内部员工汇报任务使用</view>
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
			return {
				LoadingS:false
			}
		},
		methods :{
			wechartlogin(e){
				console.log(e);
				//true 存在  直接登录   false 去绑定
				if(e.data.msg == "false"){
					uni.redirectTo({
					    url: '../index/index'
					});
				}else{
					uni.setStorage({
					    key: 'storage_user',
					    data: e.data.token,
					    success: function () {
						  uni.redirectTo({
							  url: '../today/today'
						  });
					    }
					});
				}
				this.LoadingS = false;
			},
			loginIn(){
				console.log(123)
				const _that = this
				_that.LoadingS = true
				  wx.login({
					success (res) {
					  if (res.code) {
						requireurl.request('u/v1/wx/wxlogin/',{code:res.code},_that.wechartlogin,_that.errlogin)
					  } else {
					    _that.LoadingS = false
						console.log('登录失败！' + res.errMsg)
					  }
					},
					fail(){
					    _that.LoadingS = false
					}
				  })
			},
		},
		mounted() {
			console.log(new Date() + 1)
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		
	}
	.bot-name{
		position: fixed;
		width: 100%;
		text-align: center;
		bottom: 70upx;
		font-size:24upx;
		color:rgba(51,51,51,1);
	}
	.wechart{
		width: 100%;
		height: 100%;
		image{
			width: 400upx;
			height: 160upx;
			margin:300upx auto 120upx;
			display: block;
		}
		.wxlogin{
			width:640upx;
			height:100upx;
			background:rgba(9,187,9,1);
			border-radius:16upx;
			
			text-align: center;
			font-size:34upx;
			font-weight:600;
			color:rgba(255,255,255,1);
			line-height:100upx;
			margin: 0 auto;
		}
	}
</style>