<template>
	<view class="wechart">
		<Loadings :show="LoadingS"></Loadings>
		<image src="../../static/img/kflogo.png" mode=""></image>
		<button class="wxlogin" @getuserinfo="getUserInfo" open-type="getUserInfo" type="primary" :loading="LoadingS">微信快速登录</button>
		<view class="bot-name">本小程序仅供控福内部员工汇报任务使用</view>
		<uni-popup ref="popupDialog" type="dialog">
			<uni-popup-dialog :type="msgType" title="通知" content="您需要启用消息推送吗!" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>



<script>
	import requireurl from '../../requist/requist.js'
	import Loadings from '../loading/loading.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			Loadings,
			uniPopupDialog
		},
		data() {
			return {
				LoadingS: false,
				msgType:'success',
				UserSuc : false,
				Tok  : ''
			}
		},
		methods: {
			
			/**
			 * 对话框点击确认按钮
			 */
			dialogConfirm(done) {
				var _that = this;
				_that.LoadingS = true;
				wx.requestSubscribeMessage({
					tmplIds: ['-QQQNKEVORnwRUmwotyQQoZ_ObaSjkA44Qfn6AtIJUg'],
					success(res) {
						console.log(res)
							// 需要执行 done 才能关闭对话框
							done()
							_that.LoginSucS()
					},
					fail(err) {
						console.log(err)
							done()
						_that.openConfirm()
						// uni.showToast({
						// 	title: '您已拒绝消息推送，可在设置中手动开启',
						// 	icon: 'none',
						// 	duration: 4000
						// });
					},
					complete() {
						_that.LoadingS = false;
					}
				})
				
				
			},
			
			/* 
			 *   用户手动关闭了消息推送  引导打开
			 */
			openConfirm() {
				var _that = this;
			   wx.showModal({
			     content: '检测到您已关闭消息推送，是否去设置打开？',
			     confirmText: "确认",
			     cancelText: "取消",
			     success: function (res) {
			       console.log(res);
			       //点击“确认”时打开设置页面
			       if (res.confirm) {
			         console.log('用户点击确认')
			         wx.openSetting({
			           success: (res) => { }
			         })
			       } else {
			         console.log('用户点击取消')
					_that.LoginSucS()
			       }
			     }
			   });
			 },
			
			/**
			 * 对话框取消按钮
			 */
			dialogClose(done) {
				// this.$refs.popupMessage.open()
				// 需要执行 done 才能关闭对话框
				done();
				this.LoginSucS()
			},
			
			/* 
			 *   登录成功跳转 
			*/
			LoginSucS(){
				//true 存在  直接登录   false 去绑定
				var _that = this
				if (this.UserSuc == "false") {
					uni.redirectTo({
						url: '../index/index'
					});
				} else {
					uni.setStorage({
						key: 'storage_user',
						data: _that.Tok,
						success: function() {
							uni.redirectTo({
								url: '../today/today'
							});
						}
					});
				}
				this.LoadingS = false;
			},
			wechartlogin(e) {
				var _that = this
				this.UserSuc = e.data.msg
				this.Tok = e.data.token
				this.LoadingS = false
				wx.getSetting({
					withSubscriptions: true,
					success(res) {
						console.log(res)
							_that.msgType = 'success'
							_that.$refs.popupDialog.open()
						
					}
				})
			},
			getUserInfo	() {
				this.LoadingS = true;
				const _that = this
				wx.login({
					
					success(e) {
						console.log(e.code)
						if (e.code) {
							wx.getUserInfo({
							  success: function(res) {
								let obj = {
									code: e.code,
									head : res.userInfo.avatarUrl
								}
							   requireurl.request('u/v1/wx/wxlogin/', obj, _that.wechartlogin, _that.errlogin)
							  },
							  fail(){
									_that.LoadingS = false
							  }
							})
						} else {
							_that.LoadingS = false
							console.log('登录失败！' + res.errMsg)
						}
					},
					fail(err) {
						console.log(err)
						_that.LoadingS = false
					}
				})
			},
			loginIn() {
				console.log(123)
				const _that = this
				_that.LoadingS = true

			},
		},
		mounted() {
			this.$nextTick(() => {
					uni.getStorage({
					    key: 'storage_user',
					    success: function () {
							// uni.redirectTo({
							// 	url: '../today/today'
							// });
						}
					});

			})
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;

	}

	.bot-name {
		position: fixed;
		width: 100%;
		text-align: center;
		bottom: 70upx;
		font-size: 24upx;
		color: rgba(51, 51, 51, 1);
	}

	.wechart {
		width: 100%;
		height: 100%;

		image {
			width: 400upx;
			height: 160upx;
			margin: 300upx auto 120upx;
			display: block;
		}

		.wxlogin {
			width: 640upx;
			height: 100upx;
			background: rgba(9, 187, 9, 1);
			border-radius: 16upx;

			text-align: center;
			font-size: 34upx;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			line-height: 100upx;
			margin: 0 auto;
		}
	}
</style>
