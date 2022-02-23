<template>
  <el-container>
    <span></span>
    <span></span>
    <el-header>
      <span></span>
      <button @click="loginout">退出</button>
    </el-header>
    <el-container>
      <el-aside :width="iscoll?'64px':'200px'">
        <!-- 左侧边栏 -->
         <myaside @collevent="collfn"></myaside>

      </el-aside>
      <el-main>
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import myaside from '../components/myaside.vue';
export default {
  components: { myaside },
  data() {
    return {
      iscoll: false
    }
  },
  methods:{
    collfn(v){
     this.iscoll=v
    },
    loginout(){
      // 清空本地的token
       localStorage.removeItem('token')
      // 跳转到登录页
      this.$router.push('/login')
    }
  }
};
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
 
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  
  }
  
 .el-container {
   height: 100%;
  }
  
</style>