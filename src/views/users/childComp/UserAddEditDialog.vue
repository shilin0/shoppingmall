<template>
<div>
<el-dialog
        :title="isAddUser ? '添加用户' : '修改用户'"
        :visible="dialogVisible"
        width="50%"
        :before-close="handleClose"
        >
            <el-form label-width="80px" :rules="rules" :model="userform" ref="userform">
                <el-form-item  label="用户名" prop="username">
                    <el-input v-model="userform.username" :disabled="!isAddUser"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="isAddUser">
                 <el-input v-model="userform.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userform.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                     <el-input v-model="userform.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submitClick">确 定</el-button>
              </span>
        </el-dialog>
</div>
</template>

<script>
// import reqUpdateState from '@network/api.js'
import {reqAddUser} from '@network/api.js'
import {reqUpdateUser} from '@network/api.js'
import {regMobile} from '@/tools/regxTools.js'
export default{
name:"UserAddEditDialog",
props: {
      userInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
data() {
      return {
        dialogVisible: false, //控制显示隐藏
        userform: {  //用户输入的信息
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          mobile: [
            {required: true, message: '请输入手机', trigger: 'blur'},
            {validator: regMobile, trigger: 'blur'}

          ]
        },
        userId:''
      }
    },
    created() {

    },
methods:{
     //点击确定添加用户
      submitClick(){

        this.$refs.userform.validate(async boo => {
          if (!boo) return
           if (this.isAddUser){
            //添加用户
             const result = await reqAddUser(this.userform)
             
             if (result.meta.status !== 201) return this.$message.error(result.meta.msg)
             this.dialogVisible = false
             this.$refs.userform.resetFields()
             this.$emit("updateUserList")
             this.$message.success("添加用户成功")
           }else{
             //编辑用户
             // console.log("编辑用户")
             const {email,mobile} = this.userform
             const result = await reqUpdateUser(this.userId,email,mobile)
             if (result.meta.status !== 200) return this.$message.error("更新用户失败")
             this.$emit("updateUserList")
             this.dialogVisible = false
             this.$refs.userform.resetFields()
             this.$message.success("更新用户成功")

           }
        })

      },
      //点击xx或取消
    handleClose(){

        this.$refs.userform.resetFields()
        this.$emit("clearUserInfo")
        this.dialogVisible = false
      
    }
    },
    computed: {
      isAddUser() {
        //如果时添加  返回true  否则就是false
        return !this.userInfo.id || !this.userInfo.username
      }
    },
     watch: {
      userInfo(newVlaue) {
        const {id, username, email, mobile} = newVlaue
        this.userId = id
        this.userform = {username, email, mobile, password: ''}
      }
    }

}
</script>

<style scoped>

</style>