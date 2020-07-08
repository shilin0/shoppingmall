<template>

<el-container>
  <el-header>
  <div class="logo">
  <img src="@assets/img/logo.png">
  <h1>电商后台管理系统</h1>
  </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>

  <el-container>
    <el-aside :width="menuFlge ? '64px' : '200px'">
    <div class="toggle-menu" @click="toggleMenu">|  |  |</div>
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      unique-opened
      active-text-color="#ffd04b"
      :collapse="menuFlge"
      :collapse-transition="false"
      router
    
      >

      <el-submenu v-for="item in menuList" :key="item.id" :index='item.id+""'>

        <template slot="title">
          <i :class="icons[item.id]"></i>
          <span class="el-sp">{{item.authName}}</span>
        </template>

        <el-menu-item-group>
          <el-menu-item v-for="citem in item.children" :key="citem.id" :index="citem.path">
          <i class="el-icon-menu"></i>
          {{citem.authName}}
          </el-menu-item>
        </el-menu-item-group>

        </el-submenu>

    </el-menu>

    </el-aside>
    <el-main>
    
   <router-view></router-view>
    
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import {reqMenu} from '@network/api'

export default{
name:"Home",
data(){
return {
  menuList:[],//导航栏数组
  menuFlge: false,//侧边栏收缩变量
  
  //图标数组，id对应图标类名
  icons:{
      '125': 'el-icon-user',
      '103': 'el-icon-menu',
      '101': 'el-icon-sell',
      '102': 'el-icon-notebook-2',
      '145': 'el-icon-s-platform',
  }
}
},
created(){
this.getMenu()//钩子函数不建议写太多方法，
//但是需要在这里请求，所有在下放函数，在这里调用
},
methods:{
//右边菜单收缩
  toggleMenu(){
      this.menuFlge = ! this.menuFlge


  },
//请求右侧菜单权限
async getMenu(){
const result = await reqMenu()
 if(result.meta.status !== 200){
   return this.$message.error("失败了你")
 }
 this.menuList = result.data
  
  

},

  //退出按钮事件
  logout(){
    this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功退出!'
          });
          this.$router.push("/login")//退出后跳转到登录界面
          sessionStorage.clear()//退出后清空所有token值
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      
  }
},
computed:{

//右侧菜单当前变色
  activePath(){
  const childs=[]
  this.menuList.forEach(item => {//循环导航栏数组menuList
    item.children.forEach(cItem =>{
      childs.push(cItem.path)
     
    })
  })
const cItem = childs.find(item => {
   return this.$route.path.indexOf(item) >= 0
})

         return cItem       
  }
  
  
}
}
</script>

<style scoped lang="less">
.el-container{
height: 100%;
}
.el-header{
  background: #373d41;
  display: flex;
 align-items: center;
  justify-content: space-between;     // 两端布局
  .logo{
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    img{
      width: 61px;
      height: 56px;
    }
    h1{
      color: #ffffff;
      font-size: 20px;
      padding-left: 20px;
    }
  }

}
.el-aside{
  background: #373d41;
}
.el-main{
  background: #eaedf1;
}
.el-sp{
  padding-left: 10px;
}
.toggle-menu{
    background-color: #4a5064;
    color: #fff;
    font-size: 12px;
    text-align: center;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    cursor: pointer;
}
.el-menu {
            border-right: none;
        }
</style>