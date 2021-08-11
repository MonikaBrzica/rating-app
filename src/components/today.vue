<template>
  <div class="today">
    <LeftNav/>
    <div class="main-today">
      <div class="header-container">
        <p class="header">Today is a new day. Check your ratings!</p>
        <p class="sub-header">Graphs presents you rating results. Today you have 225 rates, check it on dashboard.</p>
      </div>
      <img src="../assets/images/Oval.svg" alt="" id="bg-one">
      <img src="../assets/images/ovalcopy.svg" alt="" id="bg-two">
      <img src="../assets/images/Artwork.svg" alt="" id="bg-three">
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
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
import store from '../store/index'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart'
import Table from '../components/table'

export default {
  name: 'Today',
  components: {
    LeftNav,
    RightNav,
    PieChart,
    LineChart
    Table
  },
  created () {
    const token = localStorage.getItem('token')
    if (token && !store.state.user.token) {
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
    flex-wrap: wrap;
    .header-container{
      z-index: 2;
      max-width: 75%;
      padding: 4rem 0 0 4rem;
      margin-bottom: 12%;
      .header, .sub-header{
        color: $white-600;
        text-align: left;
      }
      .header{
        font-family: 'Roboto-Bold',sans-serif;
        font-size: 3rem;
        line-height: 58px;
        margin: 0;
        width: 24ch;
      }
      .sub-header{
        font-family: 'Roboto-Regular',sans-serif;
        font-size: 18px;
        line-height: 26px;
        width: 60ch;
      }
    }
    img {
      max-width: 100%;
      height: auto;
      position: absolute;
      z-index: 1;
    }
    #bg-one {
      top: 0;
      right: 50px;
    }
    #bg-two {
      top: 0;
      right: 50px;
    }
    #bg-three {
      top: -16px;
      right: 13.75%;
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
@media screen and (max-width: 1024px) {
  .today{
    .main-today{
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
  .today{
    .main-today {
      margin-top: 60px;
      width: 100%;
      order: 3;
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
