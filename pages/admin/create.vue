<template>
  <div class="page-wrap">
    <div class="mb-2">
      <h1>Create new Post</h1>
    </div>

    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="submit">
      <el-form-item label="Title" prop="title">
        <el-input v-model="controls.title" />
      </el-form-item>

      <el-form-item label="Text .md .html" prop="text">
        <el-input type="textarea" resize="none" :rows="10" v-model="controls.text" />
      </el-form-item>

      <el-form-item prop="img">
        <el-upload
          ref="upload"
          class="mb-2"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          :on-change="imgChange"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop img here or <em>click to upload</em></div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="success" plan @click="preview = true">Preview</el-button>
        <el-button type="primary" round native-type="submit" :loading="loading">Create</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="Before view"
      :visible.sync="preview"
      width="30%"
    >
      <div :key="controls.text">
        <vue-markdown>{{ controls.text }}</vue-markdown>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'create',

  layout: 'admin',

  middleware:['admin-auth'],

  head: {
    title: `New Post | ${process.env.appName}`
  },

  data: () => ({
    preview: false,
    loading: false,
    image: null,
    controls: {
      title: '',
      text: '',
      image: null,
    },
    rules: {
      title: [
        { required: true, message: 'Please input title', trigger: 'blur' },
      ],
      text: [
        { required: true, message: 'Please input text', trigger: 'blur' },
      ],
    }
  }),

  methods: {
    imgChange(file, fileList) {
      this.image = file.raw
    },

    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true;

          try {
            const { controls, image } = this;
            await this.$store.dispatch('post/create', { ...controls, image });

            this.controls.title = '';
            this.controls.text = '';
            this.image = null;
            this.$refs.upload.clearFiles();

            this.$message.success('Success create');
          } catch (e) {
            console.log(e);
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning('Form is not valid');
          this.loading = false;
          return false;
        }
      });
    }
  },
}
</script>

<style scoped lang="scss">
.page-wrap {
  max-width: 600px;
  margin: 0 auto;
}
</style>
