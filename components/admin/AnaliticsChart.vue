<template>
  <div>
    <canvas class="chart" ref="canvas" />
  </div>
</template>

<script>
// пакеты для графиков https://vue-chartjs.org/guide/#installation
// npm install vue-chartjs chart.js
import { Bar } from 'vue-chartjs'

export default {
  name: 'AnaliticsChart',

  extends: Bar,

  props: {
    title: String,
    labels: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
  },

  mounted() {
    const data = {
      labels: this.labels,
      datasets: [{
        label: this.title,
        data: this.data,
      }]
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            }
          }
        ]
      }
    };

    this.renderChart(data, options)
  }
}
</script>

<style scoped lang="scss">
.chart {
  height: 50vh;
}
</style>
