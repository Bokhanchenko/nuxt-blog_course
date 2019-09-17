<template>
  <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="submit">
    <h1>Add comment</h1>

    <div class="mb-2">
      <el-form-item label="Name" prop="name">
        <el-input v-model="controls.name" />
      </el-form-item>
      <el-form-item label="Comment" prop="text">
        <el-input type="textarea" v-model="controls.text" resize="none" :rows="2" />
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" round native-type="submit" :loading="loading">Add comment</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CommentForm',

  props: {
    postId: { type: String, required: true },
  },

  data: () => ({
    loading: false,
    controls: {
      name: '',
      text: '',
    },
    rules: {
      name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
      ],
      text: [
        { required: true, message: 'Please select Activity message', trigger: 'blur' }
      ],
    }
  }),

  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;

          const data = { ...this.controls, postId: this.postId, };

          try {
            const newComment = await this.$store.dispatch('comment/create', data);
            this.$message.success('Comment was added');
            this.$emit('created', newComment);
          } catch (e) {
            console.log(e)
          } finally {
            this.loading = false;
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
