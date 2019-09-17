<template>
  <div class="empty">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'empty',

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

<style scoped lang="scss">
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
