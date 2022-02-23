<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-card style="margin-top: 15px">
      <el-row :gutter="20">
        <el-col :span="8"
          ><div class="grid-content bg-purple-dark">
            <el-input
              placeholder="请输入内容"
              v-model="keyword"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getdata"
              ></el-button>
            </el-input></div
        ></el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="dialogFormVisibletj = true"
              >添加</el-button
            >
          </div></el-col
        >
      </el-row>
    </el-card>

    <!-- 表格 -->
    <el-table :data="users" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- change	switch 状态发生变化时的回调函数	新状态的值 -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="changestate(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页
total总数量    把data中的total赋给她
page-size	每页显示条目个数     把data中的pagesize赋值给它


size-change	pageSize 改变时会触发	每页条数
current-change	currentPage 改变时会触发	当前页
current-page	当前页数，支持 .sync 修饰符	number		1
 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <!-- 添加用户
    ref  用来获取整个表单内容   在下面进行二次验证
     -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibletj">
      <!--  -->
      <el-form
        :model="ruleFormtj"
        :rules="rulestj"
        ref="ruleFormtj"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleFormtj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleFormtj.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleFormtj.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleFormtj.mobile"></el-input>
        </el-form-item>
       
        
      </el-form>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibletj = false">取 消</el-button>
        <el-button type="primary" @click="submitFormtj('ruleFormtj')">确 定</el-button>
      </div>
    </el-dialog>


     <!-- 编辑用户
    ref  用来获取整个表单内容   在下面进行二次验证
     -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisiblebj">
      <!--  -->
      <el-form
        :model="ruleFormbj"
        :rules="rulesbj"
        ref="ruleFormbj"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" >
          <el-input v-model="ruleFormbj.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleFormbj.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleFormbj.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblebj = false">取 消</el-button>
        <el-button type="primary" @click="submitFormbj('ruleFormbj')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "", //搜索内容
      users: [],
      pagenum: 1, //当前页
      pagesize: 2, //每页显示的条数
      total: 0, //总数量
      currentPage2: 1,
      dialogFormVisibletj: false, //控制添加弹框的显示隐藏
      dialogFormVisiblebj: false, //控制编辑弹框的显示隐藏
      // 用户添加
      ruleFormtj: {
          username: '',
          password:"",
          email:"",
          mobile:""
        },
      rulestj: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }

          ],
          mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
          ]
        },
         // 用户编辑
      ruleFormbj: {
          username: '',
          email:"",
          mobile:""
          
        },
      rulesbj: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }

          ],
          mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
          ]
        }
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    edit(row){  //点击编辑按钮
          //  让编辑的弹框显示
          this.dialogFormVisiblebj=true
          console.log(row,"row")   //row是修改的这一行数据
          // 把编辑的这一行数据显示在编辑的弹框中   
          this.ruleFormbj=row

    },
     submitFormbj(formName) {  //编辑弹框的确定按钮
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');

          //  1请求编辑的接口                      
          this.$axios.put('/users/'+this.ruleFormbj.id,this.ruleFormbj)
          .then(res=>{
            console.log(res,"bj")
           if(res.meta.status==200){
              // 提示
             this.$message.success(res.meta.msg)
            // 弹框关闭
        this.dialogFormVisiblebj=false
            // 重新渲染页面
            this.getdata()
           }else{
            //  提示
             this.$message.error(res.meta.msg)
           }


          })






          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     submitFormtj(formName) {  //添加
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证成功
            // alert('submit!');
            //  1：axios请求添加接口  传递要添加的内容

            this.$axios.post('/users',this.ruleFormtj)
            .then(res=>{
              // console.log(res,"tj")
              if(res.meta.status==201){
                // 弹出消息框
                 this.$message.success(res.meta.msg)
                //  关闭弹框
                this.dialogFormVisibletj=false
                // 重新渲染页面
                this.getdata()
                // 清空添加的内容
                this.ruleFormtj= {
                  username: '',
                  password:"",
                  email:"",
                  mobile:""
                }


              }else{
                this.$message.error(res.meta.msg)
              }
            })






          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    changestate(row) {
      //用户状态更改
      //
      console.log(row.id);
      console.log(row.mg_state);

      // 请求接口进行修改
      this.$axios.put(`/users/${row.id}/state/${row.mg_state}`).then((res) => {
        console.log(res);
      });
    },
    handleSizeChange(val) {
      //pageSize 改变时会触发
      console.log(`每页 ${val} 条`);
      // val是点击的每页的条数   把val赋值给pagesize

      this.pagesize = val;
      // 重新渲染页面
      this.getdata();
      //
    },
    handleCurrentChange(val) {
      //当前页改变时触发
      // console.log(`当前页: ${val}`);   //val就是我点击的当前页
      // 把val赋值给data中的pagenum
      this.pagenum = val;
      // 重新渲染页面
      this.getdata();
    },
    del(id) {
      //  根据id请求删除的接口
      this.$axios.delete("/users/" + id).then((res) => {
        console.log(res, "sc");
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
          //重新渲染
          this.getdata();
        } else {
          this.$message.success(res.meta.msg);
        }
      });
    },
    getdata() {
      //用户列表数据
      this.$axios
        .get("/users", {
          params: {
            query: this.keyword, //搜索的关键字
            pagenum: this.pagenum, //当前页码
            pagesize: this.pagesize, //每页条数
          },
        })
        .then((res) => {
          console.log(123, res);
          //  接收到总数量
          this.total = res.data.total;
          this.users = res.data.users;
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>