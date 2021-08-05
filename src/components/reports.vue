<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
      <div class="pie-chart-container">
        <PieChart/>
      </div>
      <div class="table-container">
        <Table/>
      </div>
    </div>
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
import PieChart from '../components/pieChart'
import Table from '../components/table'
import { HTTP } from '../../api/axios'

export default {
  name: 'Reports',
  components: {
    LeftNav,
    RightNav,
    PieChart,
    Table
  },
  data () {
    return {
    }
  },
  created () {
    HTTP.post('rating/statistics',
      {
        startDate: this.dateFirst,
        endDate: this.dateEnd
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
    dateFirst () {
      const event = new Date()
      event.setMonth(6, 7)
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
    width: calc(100% - 164px);
    order:2;
    .pie-chart-container {
      height: 100%;
      margin-top: 200px;
      margin-right: 20px;
      display: inline;
    }
  }
}
@media only screen and (max-width: 768px) {
  .reports {
    .main-reports {
      .pie-chart-container {
        padding-top: 100px;
      }

      .table-container {
        margin-top: 50px;
      }
    }
  }
}
</style>
