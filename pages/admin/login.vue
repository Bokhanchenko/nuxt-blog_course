<template>
  <el-card>
    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="submit">
      <h1>Login</h1>

      <el-form-item label="Login" prop="login">
        <el-input v-model.trim="controls.login" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model.trim="controls.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round native-type="submit" :loading="loading">Login</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'login',

  layout: 'empty',

  head: {
    title: `Admin enter | ${process.env.appName}`
  },

  data: () => ({
    loading: false,
    controls: {
      login: '',
      password: '',
    },
    rules: {
      login: [
        { required: true, message: 'Please input login', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please select password', trigger: 'blur' },
        { min: 6, message: 'Please select password bigger then 6', trigger: 'blur' }
      ],
    }
  }),

  mounted() {
    const { message } = this.$route.query;

    switch (message) {
      case 'login':
        this.$message.info('Pleas login in system');
        break;
      case 'logout':
        this.$message.success('You are logout');
        break;
      case 'session':
        this.$message.warning('Session time is over');
        break;
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;

          try {
            await this.$store.dispatch('auth/login', { ...this.controls });

            this.$router.push('/admin')
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
  }
}
</script>

<style scoped lang="scss">
.el-card {
  width: 500px;
}
</style>
