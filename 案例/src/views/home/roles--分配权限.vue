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

          <el-button size="mini" type="danger" @click="getqx(scope.row)"
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

    <!-- 修改 
    data	展示数据
    show-checkbox	节点是否可被选择	boolean
    node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    default-checked-keys	默认勾选的节点的 key 的数组	array
    default-expand-all	是否默认展开所有节点
    -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleqx">
      <el-tree
        :data="treedata"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defkeys"
        :props="defaultProps"
        ref="treeref"
      >
      </el-tree>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleqx = false">取 消</el-button>
        <el-button type="primary" @click="alltorights">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      roleid:"",
      defaultProps: {
          children: 'children',
          label: 'authName'
        },
      defkeys:[],    //默认勾选的节点的 key 的数组
      treedata:[],   //树形数据
      dialogFormVisibleqx: false, //分配权限
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
    alltorights(){   //权限得确定ann 

// ...[1,2,3]=1,2,3
      //  获取所有选中或半选得内容
      console.log(this.$refs.treeref.getHalfCheckedKeys())
      const keys=[
        ...this.$refs.treeref.getCheckedKeys(),
        ...this.$refs.treeref.getHalfCheckedKeys()
      ]
      // 把数组转换为,拼接得字符串
      const idStr=keys.join(",")
      console.log(idStr)

      this.$axios.post(`roles/${this.roleid}/rights`,{rids:idStr})
      .then(res=>{
        console.log(res,"id")
        if(res.meta.status==200){
           this.$message.success(res.meta.msg)
           this.dialogFormVisibleqx=false
           this.getdata()
        }else{
          this.$message.error(res.meta.msg)
        }
      })
   
    },
    getqx(row) {
      this.defkeys=[]
      //分配权限
      //  把id保存下来
      this.roleid=row.id

      // 弹出弹框
      this.dialogFormVisibleqx = true;
      // 请求树形数据
      this.$axios.get('rights/tree')
      .then(res=>{
        console.log(res)  
        this.treedata=res.data  
          
          //  调用getleafkeys方法 把三级权限添加到数组中
           this.getleafkeys(row,this.defkeys)


      })

      //
    },

     getleafkeys(node,arr){
      //  该函数会获取到当前角色所有三级权限id并添加到defkeys中
      //  如果当前节点不包含children属性，则表示node为三级权限
      if(!node.children){
        return arr.push(node.id)
      }
      // 递归调用
      node.children.forEach(item=>this.getleafkeys(item,arr))
     },

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