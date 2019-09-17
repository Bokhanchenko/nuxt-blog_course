<template>
  <el-table :data="posts" style="width: 100%">
    <el-table-column prop="title" label="Post Name" />

    <el-table-column label="Date">
      <template slot-scope="{ row }">
        <i class="el-icon-time"></i>
        <span class="ml-1"> {{ row.date | date }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="views" label="Views">
      <template slot-scope="{ row }">
        <i class="el-icon-view" />
        <span> {{ row.views }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Comments">
      <template slot-scope="{ row }">
        <i class="el-icon-message" />
        <span>{{ row.comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template slot-scope="{ row }">
        <el-tooltip effect="dark" content="Open Post" placement="top">
          <el-button type="primary" circle icon="el-icon-edit" @click="open(row._id)" />
        </el-tooltip>

        <el-tooltip effect="dark" content="Remove Post" placement="top">
          <el-button type="danger" circle icon="el-icon-delete" @click="remove(row._id)" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'list',

  layout: 'admin',

  middleware: ['admin-auth'],

  head: {
    title: `All Posts | ${process.env.appName}`
  },

  // need to rewrite to fetch))
  async asyncData({ store }) {
    const posts = await store.dispatch('post/fetchAdminPosts');
    return { posts }
  },

  methods: {
    open(id) {
      this.$router.push(`/admin/post/${id}`)
    },

    async remove(id) {
      try {
        await this.$confirm('Remove Post', 'Warning!', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        });

        await this.$store.dispatch('post/remove', id);

        // this.posts = this.posts.filter(p => p._id !== id);

        this.$message.success('Post removed')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
