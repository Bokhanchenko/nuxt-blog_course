<template>
  <div>
    Admin
  </div>
</template>

<script>
export default {
  name: 'admin',

  layout: 'admin',

  middleware:['admin-auth'],
}
</script>
