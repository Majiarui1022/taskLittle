<template>
	<view class="index">
		<Loadings :show="LoadingS"></Loadings>
		<view class="addtaskinfo">
			<image src="../../static/img/tianjia.png" mode="" @click="AddTask"></image>
		</view>
		<image class="index-bj" src="../../static/img/bj.png" mode=""></image>
		<view class="header">
			<view class="tit-name" :style="{'padding-top':BarHeight + 'px'}"><span>任务日报</span></view>
			<view class="nav">
				<view class="but" @click="BackTimer">
					<image src="../../static/img/left.png" mode="" class="jian"></image>
				</view>
				<view class="time">
					<view class="times">{{Mounth}}月{{Day}}日</view>
					<image src="../../static/img/calendar.png" mode=""></image>
				</view>
				<view class="but" @click="AddTimer">
					<image src="../../static/img/right.png" mode="" class="jian"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<scroll-view style="height: 100%;" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower">
				<view class="task-list">
					<view class="row" v-for="(item,index) in TabList" :key="index">
						<view class="top-menu" :class="asdasdasd(item) === 5 ? 'Green' :
															 asdasdasd(item) === 2 ? 'Red' :  
															 asdasdasd(item) === 3 ? 'Blue' :
															 asdasdasd(item) === 4 ? 'Yellow' : 'Blue'"
						 @click="open(item)">
							<view class="tast-menu">
								<view class="task-top-const">
									<image :src="asdasdasd(item) === 5 ? GreenImg :
												 asdasdasd(item) === 2 ? RedImg :  
												 asdasdasd(item) === 3 ? BlueImg :
												 asdasdasd(item) === 4 ? YellowImg : BlueImg"
									 mode=""></image>
									<text class="name">{{item.task_name}}</text>
								</view>
								<view class="task-info">
									<view class="task-tr">
										<view class="task-td">
											<text>项目名称</text>
										</view>
										<view class="task-td">
											<text>{{item.project}}</text>
										</view>
									</view>
									<view class="task-tr">
										<view class="task-td">
											<text>工时</text>
										</view>
										<view class="task-td">
											
											<text>{{item.enter.hour ? item.enter.hour + 'h' : item.hour ? item.hour  + 'h' : '待定'}}</text>
										</view>
									</view>
									<view class="task-tr">
										<view class="task-td">
											<text>时间</text>
										</view>
										<view class="task-td">
											<text>{{item.plan_end_time}}</text>
										</view>
									</view>
								</view>
							</view>




							<view class="task-status">
								<image :src="asdasdasd(item) === 1 ? Norun :
											 asdasdasd(item) === 5 ? OKRun : BlueRun" mode=""></image>
							</view>
						</view>
						<image :src="asdasdasd(item) === 5 ? GreenImages :
						 asdasdasd(item) === 2 ? RedImages :  
						 asdasdasd(item) === 3 ? BlueImages :
						 asdasdasd(item) === 4 ? YellowImages : BlueImages"
						 class="task-msg" mode="" @click="ChangeTaskInfo(item)"></image>
						<view class="bot-con-menu">
							<view class="fat-con-box">
								<image :src="asdasdasd(item) === 5 ? GreenTsk :
											 asdasdasd(item) === 2 ? RedTsk :  
											 asdasdasd(item) === 3 ? BlueTsk :
											 asdasdasd(item) === 4 ? YellowTsk : BlueTsk"
								 mode=""></image>
								<text class="task-name">{{item.enter.info ? item.enter.info : item.info ? item.info : ''}}</text>
							</view>
						</view>
					</view>
					
					<view style="height: 180upx;width: 100%;"></view>
				</view>
			</scroll-view>
			<uni-popup ref="popup" type="center">
				<view class="popup-bj">
					<image src="../../static/img/popup.png" mode=""></image>
					<view class="pad-fat-box">
						<view class="pad-tit">工作日志</view>
						<view class="pop-cont-menu">
							<scroll-view style="height: 100%;" scroll-y="true" class="scroll-Y">
								<text class="pop-n-midd">{{enterInfo}}</text>
							</scroll-view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import Loadings from '../loading/loading.vue'
	import requireurl from '../../requist/requist.js'
	export default {
		components: {
			uniPopup,
			Loadings
		},
		data() {
			return {
				BarHeight: 0,
				TabList: [],
				LoadingS: true,
				enterInfo: '',
				timer: '01-01',
				Mounth: 1,
				Day: 1,
				Year: 1937,
				BlueImages: require('../../static/img/bluemsg.png'),
				BlueImg: require('../../static/img/bluelogo.png'),
				BlueTsk: require('../../static/img/tsk.png'),


				RedImages: require('../../static/img/red.png'),
				RedImg: require('../../static/img/hong.png'),
				RedTsk: require('../../static/img/redtsk.png'),

				GreenImages: require('../../static/img/green.png'),
				GreenImg: require('../../static/img/lv.png'),
				GreenTsk: require('../../static/img/greentsk.png'),

				YellowImages: require('../../static/img/yellow.png'),
				YellowImg: require('../../static/img/huang.png'),
				YellowTsk: require('../../static/img/yellowtsk.png'),


				BlueRun: require('../../static/img/running.png'),
				Norun: require('../../static/img/norun.png'),
				OKRun: require('../../static/img/success.png'),

				triggered: true
			}
		},
		onShow() {
			this.getTimer()
			this.GetDay()
			console.log('显示')
		},
		methods: {
			upper() {
				console.log('To the bottom')
			},
			lower() {
				console.log('to the top')
			},
			open(val) {
				this.enterInfo = val.enter.info ? val.enter.info : val.info ? val.info : '暂无内容';
				this.$refs.popup.open()
			},
			tasklist(res) {
				this.clearLoading()
				this.TabList = res.data
				console.log(this.TabList)
			},
			errtask(err) {
				console.log(err)
			},
			//修改日报
			ChangeTaskInfo(val) {
				if (!this.TodayChangeTask) {
					wx.showToast({
						title: '仅今日任务可操作',
						icon: 'none'
					})
					return
				}
				var _that = this;
				console.log(val)
				if (val.enter.id) {
					uni.setStorage({
						key: 'info',
						data: val,
						success: function() {
							_that.AddTaskInfo('change')
						}
					});
				} else {
					let obj = {
						TaskIds: val.id,
						status: val.enter.status,
						task_name: val.task_name,
						project: val.project
					}
					uni.setStorage({
						key: 'taskid',
						data: obj,
						success: function() {
							_that.AddTaskInfo('change')

						}
					});
				}
			},
			AddTask() {
				this.AddTaskInfo('add')
			},
			//新增日报
			AddTaskInfo(val) {
				uni.navigateTo({
					url: '../newtask/newtask?name=' + val
				});
			},
			//天数减一
			BackTimer() {
				if (this.Day > 1) {
					this.Day--
				} else {
					if (this.Mounth > 1) {
						this.Mounth--
						if (this.Mounth == 1 || this.Mounth == 3 || this.Mounth == 5 || this.Mounth == 7 || this.Mounth == 8 || this.Mounth ==
							10 || this.Mounth == 12) {
							this.Day = 31
						} else if (this.Mounth == 2) {
							if (this.Year % 4 == 0) {
								this.Day = 29
							} else {
								this.Day = 28
							}
						} else {
							this.Day = 30
						}
					} else {
						this.Year--
						this.Day = 31
						this.Mounth = 12
					}
				}
				this.GetDay()
			},
			AddTimer() {
				if (this.Mounth == 2) {
					if (this.Year % 4 == 0) {
						if (this.Day > 28) {
							this.Day = 1;
							this.Mounth++;
							return;
						} else {
							this.Day++;
							return;
						}
					} else {
						if (this.Day > 27) {
							this.Day = 1;
							this.Mounth++;
							return;
						} else {
							this.Day++;
							return;
						}
					}
				} else if (this.Mounth == 1 || this.Mounth == 3 || this.Mounth == 5 || this.Mounth == 7 || this.Mounth == 8 || this
					.Mounth == 10 || this.Mounth == 12) {
					if (this.Day > 30) {
						if (this.Mounth == 12) {
							this.Year++;
							this.Mounth = 1;
							this.Day = 1;
						} else {
							this.Mounth++;
							this.Day = 1;
						}
					} else {
						this.Day++;
					}

				} else {
					if (this.Day > 29) {
						this.Mounth++;
						this.Day = 1;
					} else {
						this.Day++;
					}
				}
				this.GetDay()
			},
			getTimer() {
				var timestamp2 = new Date();
				var _that = this
				console.log(this)

				_that.Year = timestamp2.getFullYear();
				_that.Mounth = timestamp2.getMonth() + 1;
				_that.Day = timestamp2.getDate();

			},
			showLoading() {
				this.LoadingS = true
			},
			clearLoading() {
				this.LoadingS = false
			},
			asdasdasd(item) {
				if (!item.enter) {
					return;
				}
				// if(item.enter.status  == 1){
				// 	return 1;
				// }else 

				if (item.enter.status == 3) {
					return 5;
				}

				var timers = parseInt(new Date(item.plan_end_time_).getTime() / (1000 * 60 * 60 * 24) - new Date().getTime() / (
					1000 * 60 * 60 * 24))
				if (timers < 0) {
					//逾期
					return 2;
				} else if (timers > 2) {
					return 3;
					//正常
				} else {
					return 4;
					//警告
				}

			},
			GetDay() {
				this.showLoading()
				var timestamp2 = new Date();
				var years = timestamp2.getFullYear();
				var Months = timestamp2.getMonth() + 1;
				var Days = timestamp2.getDate();
				console.log(timestamp2)
				console.log(years)
				console.log(Months)
				console.log(Days)
				var timesss = new Date(`${this.Year}/${this.Mounth}/${this.Day} 00:00:00`).getTime();
				var timess = new Date(`${years}/${Months}/${Days} 00:00:00`).getTime();
				console.log(timesss)
				console.log(timess)
				console.log(timesss >= timess)
				if (timesss >= timess) {
					requireurl.getData(`p/v1/wx/today/?date=${this.Year}-${this.Mounth}-${this.Day}`, this.tasklist, this.errtask)
					this.TodayChangeTask = true;
					console.log('今日及其以后')
				} else {
					requireurl.getData(`p/v1/wx/journal/?day=${this.Year}-${this.Mounth}-${this.Day}`, this.tasklist, this.errtask)
					this.TodayChangeTask = false
					console.log('其他日')
				}
			}
		},
		created() {
			// requireurl.getData('p/v1/wx/today/',this.tasklist,this.errtask)
			var _that = this
			wx.getSystemInfo({
				success: function(res) {
					_that.BarHeight = res.statusBarHeight
				}
			});
		},
		computed: {

		},
		watch: {

		},
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.index {
		width: 100%;
		height: 100%;

		.addtaskinfo {
			width: 116upx;
			height: 116upx;
			position: absolute;
			left: 50%;
			margin-left: -58upx;
			bottom: 20rpx;
			z-index: 5;

			image {
				width: 116upx;
				height: 116upx;
			}
		}

		.index-bj {
			width: 100%;
			height: 394upx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
		}

		.header {
			width: 100%;

			.tit-name {
				height: 128upx;
				font-size: 36upx;
				color: rgba(255, 255, 255, 1);
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
			}
		}

		.nav {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50upx;
			height: 50rpx;

			.but {
				width: 30px;
				height: 30px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.jian {
				width: 20upx;
				height: 38upx;
			}

			.time {
				font-size: 36upx;
				color: rgba(255, 255, 255, 1);
				margin: 0 50upx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 38upx;
					height: 38upx;
					margin-left: 24upx;
					
				}
			}
		}

		.content {
			width: 100%;
			height: calc(100% - 228upx);
			box-sizing: border-box;
			padding-top: 30upx;

			.task-list {
				width: 100%;
				height: 100%;
				padding-bottom: 1px;
				box-sizing: border-box;
				.row {
					width: 690upx;
					height: 300upx;
					margin: 0 auto 30upx;
					position: relative;
					.task-msg {
						width: 105rpx;
						height: 105rpx;
						position: absolute;
						right: 24rpx;
						bottom: 10rpx;
					}

					.top-menu {
						width: 690upx;
						height: 240upx;
						border-radius: 20upx;
						position: relative;
						padding: 20upx 40upx;
						box-sizing: border-box;
						display: flex;

						&.Green {
							background: linear-gradient(90deg, rgba(34, 177, 214, 1) 0%, rgba(63, 225, 174, 1) 100%);
							box-shadow: 0upx 2upx 14upx 0upx rgba(34, 177, 214, 0.57);
						}

						&.Red {
							background: linear-gradient(90deg, rgba(231, 11, 52, 1) 0%, rgba(242, 101, 137, 1) 100%);
							box-shadow: 0upx 6upx 13upx 1upx rgba(23, 106, 180, 0.2);
						}
						&.Yellow {
							background: linear-gradient(90deg, rgba(231, 203, 11, 1) 0%, rgba(247, 167, 102, 1) 100%);
							box-shadow: 0upx 6upx 13upx 1upx rgba(23, 106, 180, 0.2);
						}

						&.Blue {
							background:linear-gradient(90deg,rgba(65,161,247,1) 0%,rgba(100,210,241,1) 100%);
							box-shadow:0upx 6upx 13upx 1upx rgba(23,106,180,0.2);
						}

						.top-menu-bjimg {
							width: 100%;
							height: 100%;
							position: absolute;
							z-index: -1;
						}

						.tast-menu {
							width: calc(100% - 122upx);
							height: 100%;
							border-right: 1px solid linear-gradient(0deg, rgba(196, 229, 242, 1) 0%, rgba(90, 195, 242, 1) 100%);
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							.task-top-const {
								width: 100%;
								height: 90upx;
								display: flex;
								align-items: center;

								image {
									width: 90upx;
									height: 90upx;
								}

								.name {
									;
									font-size: 32upx;
									font-weight: 500;
									color: #FFFFFF;
									margin-left: 17upx;
								}
							}

							.task-info {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.task-tr {
									&:nth-child(1) {
										width: 260upx;
									}

									&:nth-child(2) {
										width: 75upx;
									}

									&:nth-child(3) {
										width: 75upx;
									}

									.task-td {
										width: 100%;
										font-size: 24upx;
										font-weight: 500;
										color: rgba(234, 248, 248, 1);
										line-height: 40upx;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
								}
							}
						}

						.task-status {
							width: 120upx;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 40upx;
								height: 40upx;
							}
						}
					}

					.bot-con-menu {
						width: 610upx;
						height: 100upx;
						background: rgba(255, 255, 255, 1);
						box-shadow: 0upx 6upx 13upx 1upx rgba(23, 106, 180, 0.2);
						border-radius: 40upx;
						position: absolute;
						left: 50%;
						bottom: 0;
						z-index: -1;
						margin-left: -305upx;
						padding-top: 40upx;
						box-sizing: border-box;

						.fat-con-box {
							display: flex;
							align-items: center;
							padding: 0 30upx;
							box-sizing: border-box;
							height: 100%;

							image {
								width: 26upx;
								height: 26upx;
								margin-right: 16upx;
							}

							.task-name {
								font-size: 24upx;
								font-weight: 500;
								color: rgba(102, 102, 102, 1);
								width: calc(100% - 42upx);
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}
				}
			}
		}

		.popup-bj {
			width: 602upx;
			height: 656upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 40upx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
				display: block;
				position: absolute;
				left: 0;
				top: -29upx;
				z-index: 0;
			}

			.pad-fat-box {
				width: 100%;
				height: 100%;
				padding: 30upx 60upx;
				box-sizing: border-box;

				.pad-tit {
					width: 100%;
					;
					font-size: 44upx;
					background: transparent;
					color: rgba(51, 51, 51, 1);
					line-height: 184upx;
					position: relative;
					z-index: 0;
				}

				.pop-cont-menu {
					width: 100%;
					height: calc(100% - 184upx);

					.pop-n-midd {
						font-size: 28upx;
						color: rgba(51, 51, 51, 1);
						line-height: 40upx;
					}
				}
			}
		}
	}
</style>
