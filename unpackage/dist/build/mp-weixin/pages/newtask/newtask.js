(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/newtask/newtask"],{"175c":function(t,e,a){"use strict";a.r(e);var n=a("1d19"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=s.a},"1d19":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("50c9"));function s(t){return t&&t.__esModule?t:{default:t}}var i=function(){a.e("pages/loading/loading").then(function(){return resolve(a("293e"))}.bind(null,a)).catch(a.oe)},o={components:{Loadings:i},data:function(){var t=this.getDate({format:!0});return{changeValue:"",rizhi:"",maxLong:-1,Loading:!1,ProjectName:"",index:"0",startTime:t,date:t,tasktimer:"",array:[{status:1,name:"未开始"},{status:2,name:"进行中"},{status:3,name:"完成"}],name:"",changeID:0,TaskIds:0,TodayChangeTask:!0}},onShow:function(){console.log("首页展示")},onLoad:function(t){this.name=t.name,console.log(t.name)},methods:{CommitTask:function(){if(this.Loading=!0,"change"==this.name){if(""==this.index||""==this.tasktimer)return void(this.Loading=!1);if(this.changeID>0){var t={status:1*this.index+1,hour:this.tasktimer,info:this.rizhi};n.default.getPutData("p/v1/wx/journal/".concat(this.changeID,"/"),t,this.tasklist,this.errtask)}else{var e={status:1*this.index+1,hour:this.tasktimer,info:this.rizhi,taskuser:this.TaskIds};n.default.request("p/v1/wx/journal/",e,this.tasklist,this.errtask)}}else{if(""==this.index||""==this.date||""==this.changeValue||""==this.tasktimer||""==this.ProjectName)return void(this.Loading=!1);var a={project:this.ProjectName,status:1*this.index+1,plan_start_time:this.startTime,plan_end_time:this.date,name:this.changeValue,hour:this.tasktimer,info:this.rizhi};n.default.request("p/v1/wx/task/",a,this.tasklist,this.errtask)}},tasklist:function(e){this.Loading=!1,console.log(e),200==e.statusCode||201==e.statusCode?(wx.showToast({title:"操作成功",icon:"none"}),t.navigateBack({delta:1})):wx.showToast({title:e.data[0],icon:"none"})},goback:function(){t.navigateBack({delta:1})},change:function(t){console.log(t),this.index=t.target.value},bindDateChangeTwo:function(t){this.startTime=t.target.value,console.log(t.target.value)},bindDateChange:function(t){this.date=t.target.value,console.log(t.target.value)},getDate:function(t){var e=new Date,a=e.getFullYear(),n=e.getMonth()+1,s=e.getDate();return"start"===t?a-=60:"end"===t&&(a+=2),n=n>9?n:"0"+n,s=s>9?s:"0"+s,"".concat(a,"-").concat(n,"-").concat(s)}},computed:{startDate:function(){return this.getDate("start")},endDate:function(){return this.getDate("end")}},mounted:function(){var e=this;t.getStorage({key:"taskid",success:function(a){console.log(a),a.data&&(e.TaskIds=a.data.TaskIds,e.index=(a.data.status-1).toString(),e.changeValue=a.data.task_name,e.ProjectName=a.data.project),t.removeStorage({key:"taskid",success:function(t){console.log("success")}})}}),t.getStorage({key:"info",success:function(a){console.log(a.data),a.data&&(e.ProjectName=a.data.project,e.changeID=a.data.enter.id,e.index=(a.data.enter.status-1).toString(),e.rizhi=a.data.enter.info,e.tasktimer=a.data.enter.hour,e.changeValue=a.data.task_name),t.removeStorage({key:"info",success:function(t){console.log("success")}})}})},watch:{name:function(t,e){}}};e.default=o}).call(this,a("543d")["default"])},"1f80":function(t,e,a){"use strict";a.r(e);var n=a("b1c2"),s=a("175c");for(var i in s)"default"!==i&&function(t){a.d(e,t,(function(){return s[t]}))}(i);a("d218");var o,r=a("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=c.exports},b1c2:function(t,e,a){"use strict";var n,s=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}))},bf09:function(t,e,a){"use strict";(function(t){a("69d6"),a("921b");n(a("66fd"));var e=n(a("1f80"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},d218:function(t,e,a){"use strict";var n=a("f7c0"),s=a.n(n);s.a},f7c0:function(t,e,a){}},[["bf09","common/runtime","common/vendor"]]]);