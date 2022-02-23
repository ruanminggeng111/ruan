<template>
  <div>
    <button @click="dialogFormVisibletj = true">添加</button>
    <el-table :data="roles" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props"> 11111 </template>
      </el-table-column>
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row.id)"
            >Delete</el-button
          >

          <el-button size="mini" type="danger"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisibletj">
      <!--  -->
      <el-form
        :model="ruleFormtj"
        :rules="rulestj"
        ref="ruleFormtj"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleFormtj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleFormtj.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibletj = false">取 消</el-button>
        <el-button type="primary" @click="submitFormtj('ruleFormtj')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisiblebj">
      <!--  -->
      <el-form
        :model="ruleFormbj"
        :rules="rulesbj"
        ref="ruleFormbj"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleFormbj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleFormbj.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblebj = false">取 消</el-button>
        <el-button type="primary" @click="submitFormbj('ruleFormbj')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

  
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      dialogFormVisibletj: false,
      ruleFormtj: {
        roleName: "",
        roleDesc: "",
      },
      rulestj: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
      dialogFormVisiblebj: false,
      ruleFormbj: {
        roleName: "",
        roleDesc: "",
      },
      rulesbj: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
   
    edit(row) {
      //  弹框显示
      this.dialogFormVisiblebj = true;
      // row赋值给表单元素
      this.ruleFormbj = row;

      console.log(this.ruleFormbj);
    },
    submitFormbj(formName) {
      //修改
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.$axios
            .put("/roles/" + this.ruleFormbj.id, this.ruleFormbj)
            .then((res) => {
              console.log(res, 0);
              if (res.meta.status == 200) {
                this.$message.error(res.meta.msg);
                this.dialogFormVisiblebj = false;
                this.getdata();
              } else {
                this.$message.error(res.meta.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitFormtj(formName) {
      //添加
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');

          // 请求
          this.$axios.post("/roles", this.ruleFormtj).then((res) => {
            console.log(res, "role");
            if (res.meta.status == 201) {
              // 提示
              this.$message.success(res.meta.msg);
              // 弹框隐藏
              this.dialogFormVisibletj = false;
              // 重新渲染
              this.getdata();
              // 清空
              this.ruleFormtj = {
                roleName: "",
                roleDesc: "",
              };
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    del(id) {
      //删除

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.delete("roles/" + id).then((res) => {
            console.log(res);
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getdata();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getdata() {
      this.$axios.get("/roles").then((res) => {
        console.log(res);
        this.roles = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>