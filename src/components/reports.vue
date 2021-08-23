<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
      <div class="calendar">
        <Calendar/>
      </div>
      <div class="main-container">
        <div class="line-chart-container">
          <LineChart/>
        </div>
        <div class="pie-chart-container">
          <PieChart/>
        </div>
        <div class="table-container">
          <Table/>
        </div>
      </div>
    </div>
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart.vue'
import Table from '../components/table'
import Calendar from '../components/calendar.vue'

export default {
  name: 'Reports',
  components: {
    LeftNav,
    RightNav,
    PieChart,
    LineChart,
    Table,
    Calendar
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.reports {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 100px;
  margin-right: 64px;
  .main-reports {
    flex-grow: 1;
    order:2;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .calendar {
      width: 100%;
      margin-left: 16px;
    }
    .main-container{
      z-index: 2;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 11px 16px;
      column-gap: 1rem;
      row-gap: 1rem;
      .line-chart-container{
        border-radius: 4px;
        width: 72.5%;
        height: 432px;
        background-color: $bg;
        padding-bottom: 16px;
      }
      .pie-chart-container {
        border-radius: 4px;
        width: 26%;
        max-height: 432px;
        background-color: $bg;
        padding-bottom: 16px;
      }
      .table-container {
        width: 37%;
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
@media only screen and (max-width: 425px) {
  .reports{
    margin-left: 20px;
    margin-right: 20px;
    .main-reports {
      .main-container {
        padding: 0;
      }
      .header-container {
        padding: 10rem 0 0 0;
      }
      img {
        height: 20%;
      }
      #bg-three {
        top: 50px;
      }
    }
  }
}
</style>
