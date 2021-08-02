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
          position: 'bottom',
          markers: {
            radius: 0
          },
          padding: 5,
          offsetX: 10
        },
        dataLabels: {
          textAnchor: 'middle'
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
        startDate: this.data.first,
        endDate: this.data.end
      },
      {
        headers: { Authorization: 'Bearer ' + this.$store.state.user.token }
      })
      .then(response => this.$store.dispatch('setRatings', response.data.ratings))
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
  methods: {
    updateSeries () {
      this.series = this.ratings
    }
  },
  watch: {
    ratings: {
      handler () {
        this.updateSeries()
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
