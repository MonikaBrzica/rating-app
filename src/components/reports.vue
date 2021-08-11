<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
        <div class="main-container">
          <div class="line-chart-container">
            <LineChart/>
          </div>
          <div class="pie-chart-container">
          <PieChart v-bind:data="{first:dateFirst , end:dateEnd}" />
          </div>
          <div class="table-container">
            <!-- <Table/> -->
          </div>
      </div>
    </div>
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
import store from '../store'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart.vue'
export default {
  name: 'Reports',
  components: {
    LeftNav,
    RightNav,
    PieChart,
    LineChart
  },
  created () {
    const token = localStorage.getItem('token')
    if (token && !store.state.user.token) {
      console.log('if block')
      store.dispatch('checkToken')
        .then(() => store.dispatch('getStatistic', { dateFirst: this.dateFirst, dateEnd: this.dateEnd })
        )
    } else {
      store.dispatch('getStatistic', { dateFirst: this.dateFirst, dateEnd: this.dateEnd })
    }
  },
  data () {
    return {
    }
  },
  computed: {
    dateFirst () {
      const event = new Date()
      event.setMonth(7, 7)
      return event.toISOString()
    },
    dateEnd () {
      const event = new Date()
      return event.toISOString()
    }
  }
}
</script>
<style lang="scss" scoped>
.reports {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .main-reports {
    flex-grow: 1;
    order:2;
    display: flex;
    flex-wrap: wrap;
    .main-container{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 16px;
      padding-bottom: 100px;
      column-gap: 1rem;
      row-gap: 1rem;
      justify-content: space-between;
      .line-chart-container{
        width: 72.5%;
        background-color: $bg;
      }
      .pie-chart-container {
        width: 25%;
        background-color: $bg;
      }
      .table-container {
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .reports {
  }
}
</style>
