(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e9bbc"],{"8f91":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"about"},[s("h2",[e._v(e._s(e.id?"编辑":"新建")+"管理员")]),s("el-form",{attrs:{"label-position":"right","label-width":"80px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[s("el-form-item",{attrs:{label:"用户名"}},[s("el-input",{model:{value:e.model.username,callback:function(t){e.$set(e.model,"username","string"===typeof t?t.trim():t)},expression:"model.username"}})],1),s("el-form-item",{attrs:{label:"密码"}},[s("el-input",{attrs:{type:"password"},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password","string"===typeof t?t.trim():t)},expression:"model.password"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("保存")])],1)],1)],1)},r=[],a=(s("d3b7"),s("96cf"),{props:["id"],data:function(){return{model:{username:"",password:""}}},methods:{save:function(){var e;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:if(this.model.username){t.next=3;break}return this.$message({type:"warning",message:"请输入用户名"}),t.abrupt("return");case 3:if(!this.id){t.next=9;break}return t.next=6,regeneratorRuntime.awrap(this.$http.put("rest/admin_user/".concat(this.id),this.model));case 6:e=t.sent,t.next=12;break;case 9:return t.next=11,regeneratorRuntime.awrap(this.$http.post("rest/admin_user",this.model));case 11:e=t.sent;case 12:console.log(e),this.$router.push("/admin_user/list"),this.$message({type:"success",message:"保存成功"});case 15:case"end":return t.stop()}}),null,this)},fetch:function(){var e;return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(this.$http.get("rest/admin_user/".concat(this.id)));case 2:e=t.sent,this.model=e.data;case 4:case"end":return t.stop()}}),null,this)}},mounted:function(){this.id&&this.fetch()}}),i=a,o=s("2877"),u=Object(o["a"])(i,n,r,!1,null,null,null);t["default"]=u.exports}}]);