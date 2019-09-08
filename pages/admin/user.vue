<template>
  <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="submit">
    <h1>Create user</h1>

    <el-form-item label="Login" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model.trim="controls.password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" round native-type="submit" :loading="loading">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'user',

    layout: 'admin',

    middleware:['admin-auth'],

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

    methods: {
      submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.loading = true;

            try {
              await this.$store.dispatch('auth/createUser', { ...this.controls });

              this.$message.success('User created');
              this.controls.login = '';
              this.controls.password = '';
              this.loading = false;
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
  .el-form {
    max-width: 600px;
    margin: 0 auto;
  }
</style>
