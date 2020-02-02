<template>
  <div>
    <!--编写页面静态部分，即view部分-->
    <!--查询表单-->
    <el-form :model="params">   
    <el-select v-model="params.siteId" placeholder="请选择站点">
    <el-option v-for="item in siteList"
               :key="item.siteId"
               :label="item.siteName"
               :value="item.siteId">
    </el-option>
    </el-select>
      页面别名：<el-input v-model="params.pageAliase"  style="width: 100px"></el-input>   
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link :to="{path:'/cms/page/add',query:{
        page:this.params.page,
        siteId:this.params.siteId
      }}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="pageName"
        label="页面名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pageAliase"
        label="别名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pageType"
        label="页面类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="访问路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pagePhysicalPath"
        label="物理路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pageCreateTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="page">
          <el-button-group>
          <el-button
            size="small"
            icon="el-icon-view"
            @click="preview(page.row.pageId)">预览</el-button>
          <el-button
            size="small"
            icon="el-icon-upload2"
            @click="postPage(page.row.pageId)">发布</el-button>
          <el-button
            size="small"
            icon="el-icon-edit"
            @click="edit(page.row.pageId)">编辑</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            type="danger"
            @click="del(page.row.pageId)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
    style="float: right;"
    >
    </el-pagination>
  </div>
</template>
<script>
  /*编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        siteList:[],//站点列表
        list: [

        ],
        total: 0,
        params: {
          page: 1,
          size: 10,
          siteId:'',
          pageAliase:''
        }
      }
    },
    methods: {
      query: function () {
        // alert('查询');
        //调用服务端接口
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })

      },
      changePage:function(page){//形参就是当前页码
        // alert(page);
        this.params.page = page;
        //调用query方法
        this.query()
      },
      edit:function(pageId){
        //打开修改页面
        this.$router.push({
          path:'/cms/page/edit/'+pageId
        })
      }
    },
    created(){
      //取出路由中的参数，赋值给数据对象
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
    },
    mounted(){
      //当DOM元素渲染完成后调用query
      this.query();
      //初始化站点列表
      cmsApi.site_list().then((res)=>{
        this.siteList = res.queryResult.list;
      })
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
