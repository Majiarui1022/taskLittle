<template>
	<view class="news-page">
		<Loadings :show="Loading"></Loadings>
		<view class="tab-list">
			
				<view class="row" >
					<view class="row-th">
						<view class="label-name">
							<span>项目名称</span>
						</view>
						<view class="label-init">
							<input class="init-word" disabled="disabled" v-model="ProjectName" placeholder="请输入项目名称" />
						</view>
					</view>
				</view>
			
			<view class="row" >
				<view class="row-th">
					<view class="label-name">
						<span>任务名称</span>
					</view>
					<view class="label-init">
						<input class="init-word" :disabled="name == 'change'" v-model="changeValue" placeholder="请输入任务名称" />
					</view>
				</view>
			</view>
			<view class="row">
				<view class="row-th">
					<view class="label-name">
						<span>任务状态</span>
					</view>
					<view class="label-init">
						<picker class="init-word" @change="change" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
						<image src="../../static/img/iconRig.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="row" v-if="name !== 'change'">
				<view class="row-th">
					<view class="label-name">
						<span>计划开始时间</span>
					</view>
					<view class="label-init">
						<picker class="init-word" mode="date" :value="startTime" :start="startDate" :end="endDate" @change="bindDateChangeTwo">
							<view class="uni-input">{{startTime}}</view>
						</picker>
						<image src="../../static/img/iconRig.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="row" v-if="name !== 'change'">
				<view class="row-th">
					<view class="label-name">
						<span>计划完成时间</span>
					</view>
					<view class="label-init">
						<picker class="init-word" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
						<image src="../../static/img/iconRig.png" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="row" v-if="name == 'change'">
				<view class="row-th">
					<view class="label-name">
						<span>工作时间</span>
					</view>
					<view class="label-init">
						<input class="init-word" type="digit" v-model="tasktimer" placeholder="请输入工作时间"/>
						<span class="unit">/h</span>
						<image src="../../static/img/iconRig.png" mode=""></image>
					</view>
				</view>
			</view>
			
			
			
			<view class="row" v-if="name == 'change'">
				<view class="row-th row-zhi">
					<view class="label-name">
						<span>工作日志</span>
					</view>
					<view class="label-init label-word">
						 <textarea v-model="rizhi" :maxlength="maxLong" placeholder="请填写工作日志"/>
					</view>
				</view>
			</view>
			
			<view class="row address-add" v-if="addressName == ''">
				<view class="row-th">
					<view class="label-name">
						<span>所在位置</span>
					</view>
					<view class="label-init">
						<image @click="getLoaction" src="../../static/img/addressicn.png" class="address-icn" mode=""></image>
					</view>
				</view>
			</view>
			
			<view class="row address-cha" v-else>
				<view class="row-th">
					<view class="label-name">
						<span>所在位置</span>
						<view class="add-res-info">{{addressName}}</view>
					</view>
					<view class="label-init">
						<image @click="getLoaction" src="../../static/img/getaddress.png" class="address-icn" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="but-list">
			<button type="primary" @click="goback">取消</button>
			<button type="primary" :loading="Loading" @click="CommitTask">提交</button>
		</view>
	</view>
</template>

<script>
	import Loadings from '../loading/loading.vue'
	import requireurl from '../../requist/requist.js'
	export default {
		components:{
			Loadings
		},
		data(){
			const currentDate = this.getDate({
				format: true
			})
			return { 
				changeValue : '',
				rizhi:'',
				maxLong : -1,
				Loading : false,
				ProjectName:'每日工作',
				index: "0",
				startTime:currentDate,
				date: currentDate,
				tasktimer:'',
				array : [
					{
						status:1,
						name:'未开始'
					},
					{
						status:2,
						name:'进行中'
					},
					{
						status:3,
						name:'完成'
					},
				],
				name : '',
				changeID:0,
				TaskIds:0,
				TodayChangeTask : true,
				addressName : ''
			}
		},
		onShow() {
			this.addressName=''
			console.log('首页展示')
			this.Loading = true;
			this.getLoaction()
			
		},
		onLoad(option) {
			this.name = option.name		
			console.log(option.name	)
		},
		methods:{
			CommitTask(){
				if(this.addressName == ''){
					wx.showToast({
						title:'请先获取位置',
						icon: 'none'
					})
					return
				}
				if(this.index == ''){
					wx.showToast({
						title:'请完善信息',
						icon: 'none'
					})
							return;
				}
				this.Loading = true
				
				//修改任务信息
				if(this.name == 'change'){
					if(this.tasktimer == ''){
						this.Loading = false;
						wx.showToast({
							title:'请完善信息',
							icon: 'none'
						})
						return;
					}
					if(this.changeID > 0){
						let obj = {
							status : (this.index * 1) + 1,
							hour : this.tasktimer,
							info : this.rizhi,
							address : this.addressName
						}
						requireurl.getPutData(`p/v1/wx/journal/${this.changeID}/`,obj,this.tasklist,this.errtask)
					}else{
						let obj = {
							status : (this.index * 1) + 1,
							hour : this.tasktimer,
							info : this.rizhi,
							taskuser : this.TaskIds,
							address : this.addressName
						}
						requireurl.request('p/v1/wx/journal/',obj,this.tasklist,this.errtask)
					}
				}else{
					//新增任务信息
					
						//startTime  计划开始时间
						//index       任务状态
						//changeValue 任务名称
						//date        计划完成时间
						//addressName 地理位置
				
					if(this.date == '' || this.changeValue =='' || this.startTime == ''){
							this.Loading = false
							return;
					};
					
					let obj = {
						status : (this.index * 1) + 1,
						plan_start_time:this.startTime,
						plan_end_time : this.date,
						name : this.changeValue,
						address : this.addressName
					}
					requireurl.request('p/v2/wx/task/',obj,this.tasklist,this.errtask)
				}
				
			},
			tasklist(res){
				this.Loading = false
				console.log(res)
				if(res.statusCode == 200 || res.statusCode == 201){
					wx.showToast({
						title:'操作成功',
						icon: 'none'
					})
					uni.navigateBack({
					    delta: 1
					});
				}else{
					wx.showToast({
						title:res.data[0],
						icon: 'none'
					})
				}
			},
			//返回上一页
			goback(){
				uni.navigateBack({
				    delta: 1
				});
			},
		   change: function(e) {
				console.log(e)
				this.index = e.target.value 
			},
			bindDateChangeTwo:function(e){
				this.startTime = e.target.value
				console.log(e.target.value)
			},
			 bindDateChange: function(e) {
				this.date = e.target.value
				console.log(e.target.value)
			},
			 getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        },
			getLoaction(){
				var _that = this;
				uni.getLocation({
				    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				    success:  (res)=> {
						console.log('用户允许')
						console.log(res)
						var QQMapWX = require('../../components/qqmap/qqmap-wx-jssdk.min.js')
						var demo = new QQMapWX({
						    key: 'TNRBZ-KAZ3W-FLVRN-RMGBB-AR27Z-UEBYG' // 必填
						});
						 demo.reverseGeocoder({
						   location: {
							 latitude: res.latitude,
							 longitude: res.longitude
						   },
						  //  location: {
								// latitude:31.185582,
								// longitude: 121.638490
						  //  },
						   success: function (res) {
							 console.log(res);
							 console.log(res.result);
							 let addressCity = res.result.address_component;
							 let addressTitle = res.result.address_reference.landmark_l2.title
							 if(addressCity.district == ''){
							    _that.addressName = addressCity.province + res.result.formatted_addresses.recommend + addressTitle
							 }else{
								 if(addressCity.province == addressCity.city){
									 _that.addressName = addressCity.city + addressCity.district + addressCity.street_number + addressTitle
								 }else{
									 _that.addressName = addressCity.province + addressCity.city + addressCity.district + addressCity.street_number + addressTitle
								 }
							 }
							 console.log(_that.addressName)
							
						   },
						   fail: function (res) {
							 console.log(res);
							 uni.showToast({
							     title: '地址解析失败，请点击图标重试',
							 	icon :'none',
							     duration: 2000
							 });
						   },
						})
					},
					fail :(err)=> {
						console.log('用户拒绝授权，清除位置')
						// uni.showToast({
						//     title: '定位失败，请您手动打开位置权限',
						// 	icon :'none',
						//     duration: 2000
						// });
						this.openConfirm()
					},
					complete:()=> {
						this.Loading = false;
					}
				});
			},
			
			 openConfirm() {
			    wx.showModal({
			      content: '检测到您没打开此小程序的定位权限，是否去设置打开？',
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
			        }
			      }
			    });
			  }
		},
		 computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		mounted() {
			var _that = this
			uni.getStorage({
			    key: 'taskid',
			    success: function (res) {
					console.log(res)
					if(res.data){
						_that.TaskIds = res.data.TaskIds;
						_that.index = (res.data.status - 1).toString();
						_that.changeValue = res.data.task_name;
						_that.ProjectName = res.data.project
					}
					uni.removeStorage({
					    key: 'taskid',
					    success: function (res) {
					        console.log('success');
					    }
					});
			    }
			});
			uni.getStorage({
			    key: 'info',
			    success: function (res) {
			        console.log(res.data);
					if(res.data){
						_that.ProjectName = res.data.project
						_that.changeID = res.data.enter.id;
						_that.index = (res.data.enter.status - 1).toString();
						_that.rizhi = res.data.enter.info;
						_that.tasktimer = res.data.enter.hour;
						_that.changeValue = res.data.task_name;
					}
					uni.removeStorage({
					    key: 'info',
					    success: function (res) {
					        console.log('success');
					    }
					});
			    }
			});
		},
		watch:{
			name(news,old){
				if(news == 'add'){
					
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background: #F3F3F5;
	}
	.news-page{
		width: 100%;
		height: calc(100% - 10upx);
		margin-top: 10upx;
		background: #FFFFFF;
	}
	.row{
		width: 100%;
		border-bottom: 1px solid #F3F3F5;
		padding: 30upx 0;
		
	}
	.address-icn{
		width:46upx !important;
		height:46upx !important;
	}
	.address-cha{
		.label-name{
			padding-right: 50upx;
			box-sizing: border-box;
			span{
				font-size: 22upx;
				font-family:SimHei;
				font-weight:400;
				color:rgba(0,0,0,1);
				margin-bottom: 10upx;
			}
			.add-res-info{
				font-size:28upx;
				font-family:SimHei;
				color:rgba(0,0,0,1);
			}
		}
	}
	.row-zhi{
		flex-wrap: wrap;
	}
	.row-th{
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding-left:30upx;
		padding-right: 50upx;
		box-sizing: border-box;
		align-items: center;
	}
	.label-name{
		font-size:30upx;
		color:rgba(0,0,0,1);
	}
	.label-word{
		width:690upx;
		height:300upx;
		background:rgba(230,229,229,1);
		border-radius:4px;
		margin-top: 30upx;
		padding: 19upx 15upx;
		font-size:30upx;
		color:rgba(153,153,153,1);
		box-sizing: border-box;
		display: block !important;
		textarea{
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	.init-word{
		width: 360upx;
		height: 30upx;
		font-size:30upx;
		color:rgba(0,0,0,1);
	}
	.label-init{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		image{
			width:12upx;
			height:30upx;
		}
		.init-word{
			text-align: right;
			margin-right: 10upx;
		}
		.unit{
			font-size: 30upx;
			margin-right: 10upx;
		}
	}
	
	.but-list{
		display: flex;
		margin-top: 200upx;
		button{
			width:300upx;
			height:100upx;
			border:1px solid rgba(68,98,254,1);
			border-radius:50px;
			color: #FFFFFF;
			&:nth-child(1){
				background:#FFFFFF;
				color: #4462FE;
			}
			&:nth-child(2){
				background:#4462FE;
			}
		}
	}
</style>
