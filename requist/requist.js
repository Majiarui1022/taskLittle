var host = 'https://www.kongfushidai.cn/';

//  	http://47.103.80.249:8000
/**     http://10.102.100.23:8001
//		http://10.102.100.120:8000
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 * loginstatus:为ture检测是否登录
 */
function request(url, postData, doSuccess, doFail , loginstatus) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user') : '' 
       },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入	
	  if(res.statusCode === 401){
		  console.log('未登录')
	  }
	  console.log(res)
      doSuccess(res);
    },
    fail: function () {
      doFail();
    },
  })
}







//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail , loginstatus) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user')  : '' 
      },
    method: 'GET',
    success: function (res) {
		console.log(res)
      doSuccess(res);
    },
    fail: function () {
      doFail();
    },
  })
}

//delete请求
function getDeleteData(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user')  : '' 
    },
    method: 'delete',
    success: function (res) {
	  console.log(res)
      doSuccess(res);
    },
    fail: function (err) {
      doFail(err);
    },
  })
}



//updata请求
function getUpdataData(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user')  : '' 
    },
    data: postData,
    method: 'update',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
	  console.log(res)
      doSuccess(res);
    },
    fail: function () {
      doFail();
    },
  })
}



/**
 * PUT请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function getPutData(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      'Authorization': uni.getStorageSync('storage_user') ? 'JWT ' + uni.getStorageSync('storage_user') : '' 
    },
    data: postData,
    method: 'Put',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
	  console.log(res)
      doSuccess(res);
    },
    fail: function () {
      doFail();
    },
  })
}


module.exports.request = request;
module.exports.getData = getData;
module.exports.getPutData = getPutData;


module.exports.getUpdataData = getUpdataData;

module.exports.getDeleteData = getDeleteData;

