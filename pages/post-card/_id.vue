<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>Post</h1>

        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>

      <div class="post-info">
        <small>
          <i class="el-icon-time">
            {{ new Date().toLocaleString() }}
          </i>
        </small>

        <small>
          <i class="el-icon-view">42</i>
        </small>
      </div>

      <div class="post-image">
        <img src="https://www.berlin.de/binaries/asset/image_assets/5719603/ratio_2_1/1560241983/624x312/" alt="IMG">
      </div>
    </header>

    <main class="post-content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque distinctio dolore eius ex iste itaque possimus repellendus soluta totam voluptatibus! Accusamus amet blanditiis, excepturi obcaecati totam ut velit. Aut, deleniti.</p>
    </main>

    <footer>
      <CommentForm @created="createComment" v-if="canAddComment" />

      <div class="comments" v-if="comments.length || true">
        <Comment v-for="comment in comments" :key="comment" :comment="comment"/>
      </div>
      <div v-else class="text-center"></div>
    </footer>
  </article>
</template>

<script>
  import Comment from '@/components/main/Comment'
  import CommentForm from '@/components/main/CommentForm'

  export default {
    name: 'Post',

    components: {
      Comment,
      CommentForm,
    },

    data: () => ({
      comments: [1,2,3,4],
      canAddComment: true,
    }),

    computed: {
      id() {
        return this.$route.params.id
      }
    },

    methods: {
      createComment() {
        this.canAddComment = false;
      }
    },

    validate({ params }) {
      return Boolean(params.id)
    },
  }
</script>

<style scoped lang="scss">
  .post {
    max-width: 600px;
    margin: 0 auto;

    &-title, &-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    &-info {
      margin-bottom: .5rem;
    }

    &-image img {
      width: 100%;
      height: auto;
    }

    &-header {
      margin-bottom: 1.5rem;

      a {
        color: black;
      }
    }

    &-content {
      margin-bottom: 2rem;
    }
  }
</style>
