<template>
  <el-container>
    <el-aside width="250px">
      <Aside />
    </el-aside>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import Aside from '@/components/admin/Aside'

export default {
  name: 'admin',

  components: {
    Aside,
  },
}
</script>

<style scoped lang="scss">

</style>
