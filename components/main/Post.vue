<template>
  <el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
    <header slot="header" class="post-header">
      <h3>{{ post.title }}</h3>

      <small>
        <i class="el-icon-time"> {{ post.date | date('date') }}</i>
      </small>
    </header>

    <div>
      <img class="post-img" :src="post.imageUrl" alt="post img">
    </div>

    <footer class="post-footer">
      <el-button type="primary" round @click="openPost(post._id)">Open Post</el-button>

      <span>
        <i class="el-icon-message"></i>
        {{ post.comments.length }}
      </span>
    </footer>
  </el-card>
</template>

<script>
  export default {
    name: 'PostCard',

    props: {
      post: { type: Object, required: true },
    },

    methods: {
      openPost(id) {
        this.$router.push(`/post-card/${id}`)
      }
    },
  }
</script>

<style scoped lang="scss">
.post {
  margin-bottom: 1.5rem;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-img {
    width: 100%;
    height: auto;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
}
</style>
