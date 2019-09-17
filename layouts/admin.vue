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

  computed: {
    error() {
      return this.$store.getters.error
    }
  },

  watch: {
    error(value) {
      this.$message.error(value.response.data.message)
    }
  }
}
</script>
