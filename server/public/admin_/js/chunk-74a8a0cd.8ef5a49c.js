(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74a8a0cd"],{"6f4fe":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("h2",[t._v("广告位列表")]),n("el-table",{attrs:{data:t.items}},[n("el-table-column",{attrs:{prop:"_id",label:"ID",width:"220"}}),n("el-table-column",{attrs:{prop:"name",label:"名称"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.$router.push("/ads/edit/"+e.row._id)}}},[t._v("编辑")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.remove(e.row)}}},[t._v(" 删除 ")])]}}])})],1)],1)},r=[],s=(n("b0c0"),n("d3b7"),n("96cf"),{data:function(){return{items:[]}},methods:{fetch:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(this.$http.get("rest/ads"));case 2:t=e.sent,this.items=t.data;case 4:case"end":return e.stop()}}),null,this)},remove:function(t){var e=this;this.$confirm('是否要删除广告位 "'.concat(t.name,'" ?'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(e.$http.delete("rest/ads/".concat(t._id)));case 2:n=a.sent,n.data.success&&(e.$message({type:"success",message:"删除成功!"}),e.fetch());case 4:case"end":return a.stop()}}))}))}},created:function(){this.fetch()}}),c=s,i=n("2877"),u=Object(i["a"])(c,a,r,!1,null,"0d560b48",null);e["default"]=u.exports}}]);