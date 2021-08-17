<template>
<div class="container" id="chart">
  <div class="title-container">
    <p class="title">Ratings</p>
    <img src="../assets/images/dots-vertical.png"
         alt="...">
  </div>
  <apexchart ref="linechart" type="area" :options="chartOptions" :series="series"></apexchart>

</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'lineChart',
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
    }
  },
  computed: {
    statistic () {
      return this.$store.getters.getSumRatingsLine
    },
    series () {
      return [{
        name: 'Very happy',
        data: this.statistic[0]
      }, {
        name: 'happy',
        data: this.statistic[1]
      }, {
        name: 'Meh',
        data: this.statistic[2]
      }, {
        name: 'Sad',
        data: this.statistic[3]
      }, {
        name: 'Very sad',
        data: this.statistic[4]
      }]
    },
    chartOptions () {
      return {
        chart: {
          type: 'area',
          height: '364px',
          foreColor: 'rgba(255,255,255,0.5)',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 900,
            animateGradually: {
              enabled: true,
              delay: 350
            },
            dynamicAnimation: {
              enabled: true,
              speed: 1500
            }
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
        grid: {
          position: 'front',
          yaxis: {
            line: {
              show: true
            }
          },
          padding: {
            top: 40,
            right: 24,
            bottom: 28,
            left: 32
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['rgb(4, 210, 124)', 'rgb(65, 179, 233)', 'rgb(176, 176, 178)', 'rgb(255, 186, 19)', 'rgb(249, 88, 90)'],
        stroke: {
          curve: 'smooth',
          width: '1'
        },
        xaxis: {
          type: 'datetime',
          categories: this.statistic[5]
        },
        yaxis: {
          align: 'right'
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        },
        legend: {
          markers: {
            radius: 0
          }
        },
        markers: {
          colors: ['rgb(4, 210, 124)', 'rgb(65, 179, 233)', 'rgb(176, 176, 178)', 'rgb(255, 186, 19)', 'rgb(249, 88, 90)']
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  width: 100%;
  height:100%;
  .title-container {
    padding: 20px 20px 0px 20px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    p {
      color: $white-850;
      font-family: 'Roboto-Medium', sans-serif;
      line-height: 20px;
      margin: 0;
    }
    img{
      height: 24px;
    }
  }
}
</style>
