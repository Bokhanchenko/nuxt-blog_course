<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <Post v-for="post in 3" :key="post" :post="post" />
    </el-col>
  </el-row>
</template>

<script>
  import Post from '@/components/main/Post'

  export default {
    name: 'Posts',

    head: {
      title: 'Главная',
    },

    components: {
      Post
    },

    data: () => ({
      posts: [
        { id: 1, title: 'Post 1', date: new Date() }
      ]
    })
  }
</script>
