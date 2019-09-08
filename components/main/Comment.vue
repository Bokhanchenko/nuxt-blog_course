<template>
  <el-card class="comment">
    <div class="comment-header">
      <span>Person name</span>
        <i class="el-icon-time">
          {{ new Date().toLocaleString() }}
        </i>
    </div>
    <div class="comment-text">Lorem ipsum dolor sit amet.</div>
  </el-card>
</template>

<script>
  export default {
    name: 'Comment',

    props: {
      comment: null,
    },

    data: () => ({}),

    computed: {},

    methods: {},
  }
</script>

<style scoped lang="scss">
  .comment {
    margin-bottom: 1rem;

    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5rem;
      font-size: .8rem;
    }

    &-text {
      white-space: pre-line;
    }
  }
</style>
