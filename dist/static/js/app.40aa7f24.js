(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"formatDate",(function(){return C})),a.d(n,"hidePhone",(function(){return Y}));a("4056");var r=a("44bf"),o=(a("f1dc"),a("6e47")),u=(a("4b0a"),a("2bb1")),c=(a("7844"),a("5596")),s=(a("c3a6"),a("ad06")),i=(a("0cc8"),a("3104")),p=(a("8a58"),a("e41f")),f=(a("ac1e"),a("543e")),l=(a("e260"),a("e6cf"),a("cca6"),a("a79d"),a("2d26"),a("96cf"),a("2b0e")),h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},d=[],b={name:"App"},m=b,x=a("2877"),w=Object(x["a"])(m,h,d,!1,null,null,null),v=w.exports,g=a("8c4f"),k=(a("d3b7"),[{path:"/",component:function(){return a.e("chunk-400a0bf6").then(a.bind(null,"9ed30"))},redirect:"/home",meta:{title:"首页",keepAlive:!1},children:[{path:"/home",name:"Home",component:function(){return a.e("chunk-0ac5bbba").then(a.bind(null,"7abe"))},meta:{title:"首页",keepAlive:!1}},{path:"/robotpage",name:"RobotTestBtn",component:function(){return Promise.all([a.e("chunk-18be6c1e"),a.e("chunk-421f43a8")]).then(a.bind(null,"23bd"))},meta:{keepAlive:!1}}]}]),E=g["a"].prototype.push;g["a"].prototype.push=function(e,t,a){return t||a?E.call(this,e,t,a):E.call(this,e).catch((function(e){return e}))},l["a"].use(g["a"]);var $=function(){return new g["a"]({scrollBehavior:function(){return{y:0}},routes:k})},S=$();var A=S,R=a("2f62"),T={userName:function(e){return e.app.userName}},y=T,P={userName:"",maskShow:!1,talkText:""},N={SET_USER_NAME:function(e,t){e.userName=t},setMaskShow:function(e,t){e.maskShow=t},setTalkText:function(e,t){e.talkText=t}},D={setUserName:function(e,t){var a=e.commit;a("SET_USER_NAME",t)}},M={state:P,mutations:N,actions:D};l["a"].use(R["a"]);var _=new R["a"].Store({modules:{app:M},getters:y}),U=_,j=a("f121"),B=(a("537a"),a("ac28")),H=(a("a52c"),a("2ed4")),I=(a("2994"),a("2bdd")),J=(a("c194"),a("7744")),O=(a("66b9"),a("b650"));l["a"].use(O["a"]),l["a"].use(J["a"]),l["a"].use(I["a"]),l["a"].use(B["a"]).use(H["a"]);a("9536"),a("499a"),a("4de4"),a("4160"),a("b64b"),a("159b"),a("4d63"),a("ac1f"),a("25f0"),a("5319");function C(e,t){if(void 0!==e){var a=new Date(e);/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length)));var n={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds()};for(var r in n)if(new RegExp("(".concat(r,")")).test(t)){var o=n[r]+"";t=t.replace(RegExp.$1,1===RegExp.$1.length?o:F(o))}return t}}function F(e){return("00"+e).substr(e.length)}function Y(e){return e.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")}Object.keys(n).forEach((function(e){return l["a"].filter(e,n[e])})),l["a"].prototype.$formatDate=l["a"].filter("formatDate"),l["a"].prototype.$hidePhone=l["a"].filter("hidePhone"),l["a"].prototype.$cdn=j["$cdn"],l["a"].use(f["a"]),l["a"].use(p["a"]),l["a"].use(i["a"]),l["a"].use(s["a"]),l["a"].use(c["a"]),l["a"].use(u["a"]),l["a"].use(o["a"]),l["a"].use(r["a"]),l["a"].config.productionTip=!1,new l["a"]({el:"#app",router:A,store:U,render:function(e){return e(v)}})},9536:function(e,t,a){},f121:function(e,t,a){var n=a("f1e0");e.exports=n},f1e0:function(e,t){e.exports={title:"小天欢乐打卡带你嗨",baseUrl:"https://www.xxx.com/",baseApi:"https://www.xxx.com/api",APPID:"xxx",APPSECRET:"xxx",$cdn:"https://imgs.solui.cn"}}},[[0,"runtime","chunk-vantUI","chunk-libs"]]]);