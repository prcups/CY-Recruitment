(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"5bb1":function(e,t,n){"use strict";var o=n("cf68"),a=n.n(o);a.a},7683:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var o={"u-swiper":function(){return n.e("node-modules/uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"1153"))}},a=function(){var e=this,t=e.$createElement;e._self._c},i=[]},8069:function(e,t,n){"use strict";n.r(t);var o=n("da67"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},cf68:function(e,t,n){},d537:function(e,t,n){"use strict";(function(e){n("6cdc"),n("921b");o(n("66fd"));var t=o(n("f75a"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},da67:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=getApp(),o={data:function(){return{list:[],phone_number:void 0}},onLoad:function(){var t=this;this.getBasicInfo(),e.request({url:n.globalData.URL+"getArticles",success:function(e){console.log(e);for(var n=0;n<e.data.item.length;n++)console.log(e.data.item[n].content.news_item[0]),t.list.push({image:e.data.item[n].content.news_item[0].thumb_url,title:e.data.item[n].content.news_item[0].title});console.log(t.list)}})},methods:{jumpweb:function(){getApp().globalData.articleurl="https://www.lzhcqc.com",e.navigateTo({url:"article"})},guanzhu:function(){getApp().globalData.articleurl="https://mp.weixin.qq.com/s/plFv63CEUc1AJgFwUDKhtg",e.navigateTo({url:"article"})},makephonecall:function(){e.makePhoneCall({phoneNumber:"18042853923"})},start:function(t){var n=this;e.getStorageSync("phone_number")?this.makePhonecall():e.checkSession({success:function(){n.decryptPhoneNumber(n.session_key,t.detail.encryptedData,t.detail.iv)},fail:function(){e.login({success:function(o){e.showLoading({title:"加载中"}),e.request({url:getApp().globalData.URL+"getBasicInfo",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",data:{code:o.code},success:function(e){console.log(e),n.session_key=e.data.session_key,n.decryptPhoneNumber(n.session_key,t.detail.encryptedData,t.detail.iv)},fail:function(t){e.showToast({title:"网络错误"})},complete:function(){e.hideLoading()}})}})}})},decryptPhoneNumber:function(t,n,o){var a=this;e.showLoading({title:"加载中"}),e.request({url:getApp().globalData.URL+"getPhoneNumber",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",data:{session_key:t,encryptedData:n,iv:o},success:function(t){console.log(t),e.setStorageSync("phone_number",t.data),getApp().globalData.phone_number=t.data,a.phone_number=t.data,console.log(t.data),a.makephonecall()},fail:function(t){console.log(t),e.showToast({title:"网络错误"})},complete:function(){e.hideLoading()}})},getBasicInfo:function(){var t=this;e.login({success:function(n){e.showLoading({title:"加载中"}),e.request({url:getApp().globalData.URL+"getBasicInfo",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",data:{code:n.code},success:function(n){console.log(n),t.session_key=n.data.session_key,t.openid=n.data.openid,e.setStorageSync("openid",n.data.openid),getApp().globalData.openid=n.data.openid},fail:function(t){console.log(t),e.showToast({title:"网络错误"})},complete:function(){e.hideLoading()}})}})},attend_aci:function(){e.showToast({title:"活动筹备中",icon:"none"})}}};t.default=o}).call(this,n("543d")["default"])},f75a:function(e,t,n){"use strict";n.r(t);var o=n("7683"),a=n("8069");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("5bb1");var c,s=n("f0c5"),l=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"8c6a1c86",null,!1,o["a"],c);t["default"]=l.exports}},[["d537","common/runtime","common/vendor"]]]);