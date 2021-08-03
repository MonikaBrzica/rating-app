<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
      <div class="pie-chart-container">
        <PieChart  v-bind:data="{end: this.dateend, first: this.datefirst}"/>
      </div>
    </div>
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
import PieChart from '../components/pieChart'

export default {
  name: 'Reports',
  components: {
    LeftNav,
    RightNav,
    PieChart
  },
  data () {
    return {
    }
  },
  computed: {
    datefirst () {
      const event = new Date()
      event.setMonth(6, 7)
      return event.toISOString()
    },
    dateend () {
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
      width: 100%;
      height: 100%;
      margin-top: 200px;
      margin-right: 20px;
      display: inline;
    }
  }
}
@media only screen and (max-width: 768px) {
  .reports {
  }
}
</style>
