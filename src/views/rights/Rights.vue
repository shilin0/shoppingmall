<template>
    <div>
    <BreadcrumdNav :items="['首页','用户管理','权限列表']"></BreadcrumdNav>
    </div>
</template>

<script>
import BreadcrumdNav from '@components/BreadcrumdNav.vue'

  export default {
    name: "Rights",
    components:{
      BreadcrumdNav
    }
  }
</script>

<style scoped>

</style>
