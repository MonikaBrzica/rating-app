<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
        <div class="main-container">
          <div class="line-chart-container">
            <LineChart/>
          </div>
          <div class="pie-chart-container">
          <PieChart/>
          </div>
          <div class="table-container">
            <!-- <Table/> -->
            <p>table</p>
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
        .then(() => store.dispatch('getReports', { dateFirst: this.dateFirst, dateEnd: this.dateEnd })
        )
    } else {
      store.dispatch('getReports', { dateFirst: this.dateFirst, dateEnd: this.dateEnd })
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
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .main-reports {
    flex-grow: 1;
    order:2;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .main-container{
      z-index: 2;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 11px 16px;
      column-gap: 1rem;
      row-gap: 1rem;
      .line-chart-container{
        width: 72.5%;
        height: 432px;
        background-color: $bg;
        padding-bottom: 16px;
      }
      .pie-chart-container {
        width: 25%;
        max-height: 432px;
        background-color: $bg;
        padding-bottom: 16px;
      }
      .table-container {
        margin-top: 2rem;
        width: 37%;
        height: 192px;
        background-color: blue;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .reports{
    .main-reports{
      .main-container{
        flex-direction: column;
        align-items: center;
        .line-chart-container{
          width: 100%;
        }
        .pie-chart-container{
          width: 50%;
        }
        .table-container{
          width: 70%;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .reports{
    .main-reports {
      margin-top: 60px;
      width: 100%;
      order: 3;
      .main-container{
        flex-direction: column;
        align-items: center;
        .line-chart-container{
          width: 90%;
        }
        .pie-chart-container {
          width: 60%;
        }
      }
    }
  }
}
</style>
