<template>
  <div>
    <el-table :data="rights" border style="width: 100%">
      <el-table-column type="index" width="180"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="权限等级">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.level==0">一级</el-tag>
          <el-tag v-show="scope.row.level==1" type="success">二级</el-tag>
          <el-tag v-show="scope.row.level==2" type="info">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rights: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios.get("rights/list").then((res) => {
        console.log(res);
        this.rights = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>