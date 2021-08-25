<template>
  <div id="chart" class="pie-chart">
    <div class="title-container">
      <p class="title">Ratings</p>
      <img src="../assets/images/dots-vertical.png"
           alt="...">
    </div>
    <apexchart type="pie" width="90%" height="380" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'PieChart',
  components: {
    apexchart: VueApexCharts
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          type: 'pie',
          offsetX: 20,
          foreColor: 'rgba(255,255,255,0.5)',
          fill: {
            colors: '#B0B0B2'
          },
          zoom: {
            enabled: true
          }
        },
        noData: {
          text: 'No data in database',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: 'rgba(255,255,255,0.85)',
            fontSize: '20px',
            fontFamily: "'Roboto-Medium', sans-serif"
          }
        },
        legend: {
          position: 'bottom',
          markers: {
            radius: 2,
            height: 12,
            width: 12,
            customHTML: function () {
              return '<img src= "https://res.cloudinary.com/dxlyytkww/image/upload/v1629139678/RatingApp/check_ht3d6x.png" style="margin-bottom: 3px" height="12px" width="12px" alt="check">'
            }
          }
        },
        dataLabels: {
          textAnchor: 'middle',
          formatter: function (val) {
            return Math.round(val)
          }
        },
        labels: ['Very happy', 'Happy', 'Meh', 'Sad', 'Very sad'],
        colors: ['rgb(4, 210, 124)', 'rgb(65, 179, 233)', 'rgb(176, 176, 178)', 'rgb(255, 186, 19)', 'rgb(249, 88, 90)'],
        stroke: {
          colors: 'rgb(45, 48, 56)',
          width: 4
        }
      }
    }
  },
  computed: {
    series () {
      return this.$store.getters.getSumRatings
    }
  }
}
</script>
<style scoped lang="scss">
.pie-chart {
  background-color: $bg;
  border-radius: 4px;
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
      margin: 2.5px;
    }
  }
}
</style>
