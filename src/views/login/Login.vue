<template>
<div class="login">
<div class="login_box">
<div class="logo"><img src="@assets/img/logo.png"></div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
  <el-form-item prop="username">
  <el-input v-model="ruleForm.username" prefix-icon="el-icon-user-solid"></el-input>
  </el-form-item>
  <el-form-item prop="password">
  <el-input prefix-icon="el-icon-lock" v-model="ruleForm.password" type="password"></el-input>
  </el-form-item>
<el-row>
<el-button type="primary" @click="loginClick('ruleForm')">登录</el-button>
<el-button type="info" @click="resetClick('ruleForm')">重置</el-button>
</el-row>
</el-form>

</div>

</div>


</template>

<script>
import {reqLogin} from '@network/api'
export default{
name:"Login",
data(){
  return {
    //注册登入框内容获取
    ruleForm:{
      username: 'lsl',
      password:'123123',
    },
    //注册登入表达验证
     rules: {
          username: [
            { required: true, message: '请输入用户信息', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
}
}
},
methods:{
  //点击重置表单
    resetClick(formName) {
        this.$refs[formName].resetFields();
      },
 
  //点击登入事件
  loginClick(formName){
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return false;
          } else {
            //发送请求           
         const result = await reqLogin(this.ruleForm)
            console.log(result);
            //状态码里200是成功
            //登入失败干的事情
            if(result.meta.status !==200){
              this.$message.error({
                message:result.meta.msg,
                duration:1000
              });
            }
             //登录成功
             //先保存token
             const {token} = result.data
             sessionStorage.setItem('token',token)

             //然后跳转页面
             this.$router.replace("/home")
          }
        });
    
  }
}

}
</script>

<style scoped lang="less">
.login{
    background: pink;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login_box{
    width: 450px;
    height: 300px;
    background: #ffffff;
    border-radius: 5px;
    
    position: relative;
    .logo{
       width: 130px;
       height: 130px;
       background: yellow;
       border-radius: 50%; 
       box-shadow: 0 0 10px red;
       position: absolute;
       left: 50%;
       transform: translate(-50%,-50%);
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #eeeeee;
        }
    }
.el-form{
  padding: 0 20px;
position: absolute;
left: 0;
right: 0;
bottom: 90px;

.el-row{
  position: absolute;
  right: 0;
  right: 20px;
}
    }
    }
    
}

</style>