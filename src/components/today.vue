<template>
  <div class="today">
    <LeftNav/>
    <div class="main-today">
      <div class="header-container">
        <p class="header">Today is a new day. Check your ratings!</p>
        <p class="sub-header">Graphs presents you rating results. Today you have 225 rates, check it on dashboard.</p>
      </div>
      <div class="main-container">
        <div class="line-chart-container">
          <LineChart/>
        </div>
        <div class="pie-chart-container">
          <PieChart/>
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
import store from '../store/index'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart'
export default {
  name: 'Today',
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
  min-height: 100vh;
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
    flex-wrap: wrap;
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
    }
  }
}
</style>
