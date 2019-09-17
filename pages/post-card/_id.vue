<template>
  <article class="post" v-if="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>

        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>

      <div class="post-info">
        <small>
          <i class="el-icon-time" />
          <span class="ml-1"> {{ post.date | date }}</span>
        </small>

        <small>
          <i class="el-icon-view" />
          {{ post.views }}
        </small>
      </div>

      <div class="post-image">
        <img :src="post.imageUrl" alt="IMG">
      </div>
    </header>

    <main class="post-content">
      <vue-markdown>{{ post.text }}</vue-markdown>
    </main>

    <footer>
      <CommentForm v-if="canAddComment" @created="addComment" :postId="post._id" />

      <hr class="mb-2">

      <div class="comments" v-if="post.comments.length">
        <Comment v-for="comment in post.comments" :key="comment._id" :comment="comment"/>
      </div>
      <div v-else class="text-center">There is no comments</div>
    </footer>
  </article>
</template>

<script>
import Comment from '@/components/main/Comment'
import CommentForm from '@/components/main/CommentForm'

export default {
  name: 'Post',

  head() {
    return {
      title: `${this.post.title} | ${process.env.appName}`,
      meta: [
        { hid: `post-${this.post._id}d`, name: 'description', content: `the post ${this.post.title}`},
        { hid: `post-${this.post._id}k`, name: 'keywords', content: 'post, пост javascript' }
      ]
    }
  },

  components: {
    Comment,
    CommentForm,
  },

  async asyncData({ store, params }) {
    const post = await store.dispatch('post/fetchById', params.id);
    await store.dispatch('post/addView', post);
    return { post: { ...post, views: ++post.views } }
  },

  data: () => ({
    canAddComment: true,
  }),

  methods: {
    addComment(newComment) {
      this.post.comments.unshift(newComment);
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
