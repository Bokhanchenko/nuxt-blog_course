<template>
  <div v-if="post" class="page-wrap">
    <el-breadcrumb separator="/" class="mb-2">
      <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
      <el-breadcrumb-item>Post title - {{ post.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="submit">
      <el-form-item label="Text .md .html" prop="text">
        <el-input type="textarea" resize="none" :rows="10" v-model.trim="controls.text" />
      </el-form-item>

      <div class="mb-2">
        <small class="mr-1">
          <i class="el-icon-time"></i>
          <span>{{ new Date(post.date).toLocaleString() }}</span>
        </small>

        <small >
          <i class="el-icon-view"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>

      <el-form-item>
        <el-button type="primary" round native-type="submit" :loading="loading">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Post',

  layout: 'admin',

  middleware: ['admin-auth'],

  head() {
    return {
      title: `Post | ${this.post ? this.post.title : ''}`
    }
  },

  async asyncData({ store, params }) {
    const post = await store.dispatch('post/fetchAdminById', params.id);
    return { post }
  },

  data: () => ({
    loading: false,
    controls: {
      text: '',
    },
    rules: {
      text: [
        { required: true, message: 'Please input text', trigger: 'blur' },
      ],
    }
  }),

  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;

          try {
            await this.$store.dispatch('post/update', { id: this.post._id, ...this.controls });

            this.$message.success('Success update');
            this.loading = false
          } catch (e) {
            console.log(e);
            this.loading = false;
          }
        } else {
          this.loading = false;
          return false;
        }
      });
    }
  },

  validate({ params }) {
    return Boolean(params.id)
  }
}
</script>

<style scoped >
.page-wrap {
  max-width: 600px;
  margin: 0 auto;
}
</style>
