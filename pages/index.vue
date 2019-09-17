<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10" v-if="posts">
      <Post v-for="post in posts" :key="post._id" :post="post" />
    </el-col>
  </el-row>
</template>

<script>
import Post from '@/components/main/Post'

export default {
  name: 'Posts',

  head: {
    title: `Главная | ${process.env.appName}`,
    // For SEO
    meta: [
      { hid: 'homepaged', name: 'description', content: 'The best JS BOG' },
      { hid: 'homepagek', name: 'keywords', content: 'Blog, js, nuxt' }
    ]
  },

  async asyncData({ store }) {
    const posts = await store.dispatch('post/fetch');
    return { posts };
  },

  components: {
    Post
  },
}
</script>
