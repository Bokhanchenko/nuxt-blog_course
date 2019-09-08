<template>
  <el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
    <header slot="header" class="post-header">
      <h3>Post Title</h3>

      <small>
        <i class="el-icon-time">
          {{ new Date().toLocaleString() }}
        </i>
      </small>
    </header>

    <div>
      <img
        class="post-img"
        src="https://www.berlin.de/binaries/asset/image_assets/5719603/ratio_2_1/1560241983/624x312/"
        alt="post img"
      >
    </div>

    <footer class="post-footer">
      <el-button type="primary" round @click="openPost()">Open Post</el-button>

      <span>
        <i class="el-icon-message"></i>
      </span>
    </footer>
  </el-card>
</template>

<script>
  export default {
    name: 'PostCard',

    props: {
      post: { type: Number, required: true },
    },

    methods: {
      openPost(post) {
        this.$router.push(`/post-card/${this.post}`)
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
