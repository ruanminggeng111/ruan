<template>
<div>

<p class="coll" @click="changeiscoll">|||</p>
<!-- 
    router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	boolean	—	false
    default-active	当前激活菜单的 index
    collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）	boolean	—	false
 -->
  <el-menu
    default-active="/users"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="iscollapse"
  >
  <!-- index	唯一标志	string/null	—	null -->
    <el-submenu 
    v-for="(item,index) in menus"
    :key="item.id"
    :index="item.id+''">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.authName}}</span>
      </template>
     <!-- 二级菜单 
     index	唯一标志	string
     -->
      <el-menu-item 
      v-for="it in item.children"
      :key="it.id"
      :index="'/'+it.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{it.authName}}</span>
      </el-menu-item>
    </el-submenu>
    <!--  -->
  </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      iscollapse:false
    };
  },
  mounted() {
    this.getleftdata();
  },
  methods: {
    changeiscoll(){
        //   取反
        this.iscollapse=!this.iscollapse
        // 子传父
        this.$emit('collevent',this.iscollapse)
    },
    getleftdata() {
      //获取左侧菜单数据
      this.$axios.get("/menus").then((res) => {
        console.log(res.data, "左侧");
        this.menus = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.coll{
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    font-size: 30px;
}
</style>