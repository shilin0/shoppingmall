<template>
<div>
<BreadcrumdNav :items="['首页','用户管理','角色列表']"></BreadcrumdNav>
</div>
</template>

<script>
import BreadcrumdNav from '@components/BreadcrumdNav.vue'

export default{
name:"Roles",
components:{
    BreadcrumdNav
}
}
</script>

<style scoped>

</style>