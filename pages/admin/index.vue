<template>
  <div>
    <AnaliticsChart
      title="Views count"
      :labels="views.labels"
      :data="views.data"
    />
    <AnaliticsChart
      title="Comments count"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
import AnaliticsChart from '@/components/admin/AnaliticsChart'

export default {
  name: 'admin',

  layout: 'admin',

  middleware:['admin-auth'],

  head: {
    title: `Analitics | ${process.env.appName}`
  },

  components: {
    AnaliticsChart
  },

  async asyncData({ store }) {
    const { views, comments } = await store.dispatch('post/getAnalitics');
    return { views, comments }
  },
}
</script>
