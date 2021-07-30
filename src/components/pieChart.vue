<template>
  <div id="chart" class="pie-chart" >
    <div class="title-container">
      <p class="title">Ratings</p>
      <img src="../assets/images/dots-vertical.png">
    </div>
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
  props: {
    data: Object
  },
  data: function () {
    return {
      series: [],
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
          padding: 5,
          offsetX: 10
        },
        dataLabels: {
          textAnchor: 'middle',
          formatter: function (values, opts) {
            return opts.w.config.series[opts.seriesIndex]
          }
        },
        labels: ['Very happy', 'Happy', 'Meh', 'Sad', 'Very sad'],
        colors: ['rgb(0, 168, 107)', 'rgb(65, 179, 233)', 'rgb(122, 122, 122)', 'rgb(255, 186, 19)', 'rgb(249, 88, 90)'],
        stroke: {
          colors: 'rgb(45, 48, 56)',
          width: 2
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
        firstDate: this.data.first,
        endDate: this.data.end
      }).then(response => this.$store.commit('setRatings', response.data))
      .then(this.series = this.$store.getters.getRatings)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data)
        }
      })
  },
  mounted () {
    this.series = [0, 0, 0, 0, 0]
  }
}
</script>

<style scoped lang="scss">
.pie-chart {
  background-color: $bg;
  height: 100%;
  width: 100%;
  .title-container {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    p {
      color: $white-850;
      font-family: 'Roboto-Medium', sans-serif;
      font-size: 16px;
      line-height: 29px;
      margin: 0;
    }
    img {

    }
  }
}
</style>
