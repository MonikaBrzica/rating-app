<template>
  <div id="chart" class="line-chart">
    <apexchart type="area" width="1000px" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'LineChart',
  components: {
    apexchart: VueApexCharts
  },
  data: function () {
    return {
      series: [{
        name: 'Very happy',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'Happy',
        data: [11, 32, 45, 32, 34, 52, 41]
      }, {
        name: 'Meh',
        data: [11, 32, 45, 32, 34, 52, 41]
      }, {
        name: 'Sad',
        data: [11, 32, 45, 32, 34, 52, 41]
      }, {
        name: 'Very sad',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
      chartOptions: {
        chart: {
          foreColor: 'rgba(255,255,255,0.50)',
          height: 350,
          type: 'area'
        },
        legend: {
          markers: {
            radius: 0
          }
        },
        colors: ['rgb(0, 168, 107)', 'rgb(65, 179, 233)', 'rgb(122, 122, 122)', 'rgb(255, 186, 19)', 'rgb(249, 88, 90)'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z']
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      }
    }
  }
}
</script>

<style>
.line-chart {
  background-color: #2D3038;
  width: 1289px;
}
</style>
