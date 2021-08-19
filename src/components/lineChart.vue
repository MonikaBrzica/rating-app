<template>
<div class="container" id="chart">
  <div class="title-container">
    <p class="title">Ratings</p>
    <img src="../assets/images/dots-vertical.png"
         alt="...">
  </div>
  <apexchart ref="linechart" class="area" type="area" :options="chartOptions" :series="series"></apexchart>

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
          foreColor: 'rgba(255,255,255,0.5)',
          height: '364px',
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
          position: 'back',
          strokeDashArray: 2,
          height: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          yaxis: {
            lines: {
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
          categories: this.statistic[5],
          labels: {
            datetimeUTC: false
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: true,
            color: 'rgba(255,255,255,0.2)',
            height: 1,
            width: '100%'
          }
        },
        yaxis: {
          align: 'right'
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return '<div class="arrow_box" style=" background-color: #FFFFFF; border-radius: 4px; width: 36px; position: relative;">' +
              '<span style="color: #222222">' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.1,
            inverseColors: 'rgba(255,255,255,0.2)'
          }
        },
        legend: {
          markers: {
            radius: 2,
            height: 12,
            width: 12,
            customHTML: function () {
              return '<img src= "https://res.cloudinary.com/dxlyytkww/image/upload/v1629139678/RatingApp/check_ht3d6x.png" style="margin-bottom: 3px" height="12px" width="12px">'
            }
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
  overflow: hidden;
  .area /deep/ .apexcharts-xaxistooltip.apexcharts-active {
    opacity: 0;
  }
  /deep/ .apexcharts-xcrosshairs.apexcharts-active, .apexcharts-ycrosshairs.apexcharts-active {
    opacity: 0;
  }
  /deep/ .apexcharts-tooltip {
    text-align: center;
    padding: 10px 0px;
    padding: 10px 0px;
    top: 40% !important;
  }
  /deep/ line#SvgjsLine {
    opacity: 0 !important;
  }
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
