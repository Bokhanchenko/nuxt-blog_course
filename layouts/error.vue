<template>
  <div class="error">
    <div class="error-content">
      <h1 class="error-title">Ошибка 404</h1>
      <nuxt-link to="/">Вернуться  на главную</nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &-title {
      color: red;
      margin-bottom: 1rem;
      text-align: center;
    }

    &--content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding-top: 4rem;
    }
  }
</style>
