<template>
  <el-card class="comment">
    <div class="comment-header">
      <span>{{ comment.name }}</span>
      <i class="el-icon-time"> {{ comment.date | date }}</i>
    </div>
    <div class="comment-text">{{ comment.text }}</div>
  </el-card>
</template>

<script>
export default {
  name: 'Comment',

  props: {
    comment: { type: Object, required: true },
  },
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
