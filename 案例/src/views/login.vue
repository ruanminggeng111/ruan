<template>
  <div class="login">
    <div class="login-con">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password:""
        },
        rules: {   //规则
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

              // 向服务端发送请求  传递用户名和密码

           this.$axios.post('/login',this.ruleForm)
           .then(res=>{
              
              if(res.meta.status==200){
                console.log(res.data.token)
              //  把token存储到本地
              localStorage.setItem('token',res.data.token)
                // 提示成功
                this.$message.success(res.meta.msg)
                // 跳转页面
                this.$router.push('/')
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: pink;
  .login-con {
    width: 600px;
    height: 400px;
    background-color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
</style>