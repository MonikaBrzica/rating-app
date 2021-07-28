<template>
  <div id="chart" class="pie-chart" >
    <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { HTTP } from '../../api/axios'

export default {
  name: 'PieChart',
  components: {
    apexchart: VueApexCharts
  },
  data: function () {
    return {
      firstDate: '',
      endDate: '',
      series: [0, 0, 0, 0, 0],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
          foreColor: 'rgba(255,255,255,0.85)',
          fill: {
            colors: '#B0B0B2'
          }
        },
        legend: {
          show: true,
          position: 'bottom',
          markers: {
            radius: 0
          },
          offsetX: 10
        },
        dataLabels: {
          textAnchor: 'middle',
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex]
          }
        },
        labels: ['Very happy', 'Happy', 'Meh', 'Sad', 'Very sad'],
        colors: ['#00ff10', '#04D27C', '#B0B0B2', '#F9585A', '#ff1416'],
        stroke: {
          colors: 'rgb(45, 48, 56)',
          width: 4
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }]
      }
    }
  },
  created () {
    HTTP.post('rating/statistics',
      {
        firstDate: '2021-07-26T12:12:16.365Z',
        endDate: '2021-07-26T16:12:16.365Z'
      }).then(response => this.$store.commit('setRatings', response.data))
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })
  },
  computed: {
    ratings () {
      return this.$store.getters.getRatings
    }
  },
  watch: {
    ratings: {
      handler (value) {
        this.series = value
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pie-chart {
  background-color: $bg;
  height: 100%;
  width: 100%;
}
</style>
