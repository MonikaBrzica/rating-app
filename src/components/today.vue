<template>
  <div class="today">
    <LeftNav/>
    <div class="main-today">
      <div class="header-container">
        <p class="header">Today is a new day. Check your ratings!</p>
        <p class="sub-header">Graphs presents you rating results. Today you have 225 rates, check it on dashboard.</p>
      </div>
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

export default {
  name: 'Today',
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
    this.$store.dispatch('getReports', { start: this.dateFirst, end: this.dateEnd })
  },
  computed: {
    dateFirst () {
      const event = new Date()
      event.setHours(2, 0, 0, 0)
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

.today {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .main-today {
    flex-grow: 1;
    order:2;
    display: flex;
    background-image: url('../assets/images/ovalcopy.svg'),
    url('../assets/images/Oval.svg'),
    url('../assets/images/Artwork.svg');
    background-repeat: no-repeat;
    background-position: top right, top right,top right;
    background-size: 50%;
    .header-container{
      max-width: 75%;
      height: 40%;
      padding: 4rem 0 0 4rem;
      .header, .sub-header{
        color: $white-600;
        text-align: left;
      }
      .header{
        font-family: 'Roboto-Bold',sans-serif;
        font-size: 3rem;
        line-height: 58px;
        margin: 0;
      }
      .sub-header{
        font-family: 'Roboto-Regular',sans-serif;
        font-size: 18px;
        line-height: 26px;
      }
    }
    .pie-chart-container {
      width: 419px;
      height: 432px;
      margin-top: 200px;
      margin-right: 20px;
      display: inline;
    }
    .table-container {
      padding-left: 16px;
      position: absolute;
      margin-top: 500px;
      border-radius: 4px;
      width: 707px;
    }
  }
}
/* Media query */
@media only screen and (max-width: 768px) {
  .today{
    .main-today {
      margin-top: 60px;
      width: 100%;
      .header-container{
        padding: 2rem 0 0 2rem;
        max-width: unset;
        width: 100%;
        .header{
          font-size: 1.5rem;
          line-height: 30px;
        }
        .sub-header{
          font-size: 1rem;
          line-height: 20px;
        }
      }
      .pie-chart-container {
        width: 100%;
        height: 300px;
        margin-top: 300px;
        margin-right: 0px;
        display: inline;
      }
      .table-container {
        padding-top: 600px;
      }
    }
  }
}
</style>
