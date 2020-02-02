import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig');
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
export const page_list = (page,size,params) =>{
  //将params对象数据拼装成key/value串
  let queryString =  querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+"?"+queryString);
};


//查找站点Id
export const site_list = () =>{
  return http.requestQuickGet(apiUrl+'/cms/site/list')
};

//查找模板列表
export const template_list = () =>{
  return http.requestQuickGet(apiUrl+'/cms/template/list')
};

//新增页面
export const page_add = params =>{
  return http.requestPost(apiUrl+'/cms/page/add',params)
};

//根据id查询页面
export const page_get = id =>{
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id)
};

//修改页面提交
export const page_edit = (id,params) => {
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params)
};
