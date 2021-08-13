<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
      <div class="calendar">
          <v-date-picker v-model="range"
                     class='date-picker'
                     :value="null"
                     is-range
                     is-dark
                     :select-attribute="selectAttribute"
                     :first-day-of-week="2"
                     :attributes='attrs'
                     :max-date="new Date()"
                     @dayclick="onDayClick">
        <template v-slot="{ inputValue, inputEvents }">
          <div class="input-container">
            <img src="../assets/images/calendar-range.png"
                 alt="calendar">
            <fieldset>
              <input :value="inputValue.start"
                     v-on="inputEvents.start"/>
              <p>-</p>
              <input :value="inputValue.end"
                     v-on="inputEvents.end"/>
            </fieldset>
          </div>
        </template>
      </v-date-picker>
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
import store from '../store'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart.vue'
import Table from '../components/table'

export default {
  name: 'Reports',
  components: {
    LeftNav,
    RightNav,
    PieChart,
    LineChart,
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
      selectAttribute: {
        highlight: {
          start: { fillMode: 'light' },
          base: { fillMode: 'light' },
          end: { fillMode: 'solid' }
        },
        dates: { start: this.dateFirst, end: this.dateEnd }
      },
      attrs: [
        {
          dates: new Date(),
          key: 'today',
          dot: 'blue'
        }
      ],
      range: {
        start: new Date().setHours(2, 0, 0, 0),
        end: new Date()
      }
    }
  },
  methods: {
    onDayClick () {
      store.dispatch('getReports', { dateFirst: this.dateFirst, dateEnd: this.dateEnd })
    }
  },
  computed: {
    dateFirst () {
      return this.range.start
    },
    dateEnd () {
      return this.range.end
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
    align-content: flex-start;
    .calendar {
      width: 100%;
      margin-left: 16px;
    }
    .date-picker /deep/ .vc-container.vc-is-dark {
      color: rgba(255, 255, 255, 0.85);
      background-color: #2D3038;
      border-color: #2D3038;
    }
    /deep/ .vc-is-dark .vc-title {
      color: rgba(255, 255, 255, 0.85);
      font-family: Roboto-Medium;
      font-weight: normal;
      font-size: 14px;
      text-align: center;
    }
    /deep/ .vc-is-dark .vc-weekday {
      color: #006BF5;
    }
    /deep/ .vc-day-layer {
      padding: 1px;
    }
    /deep/ .vc-highlight {
      background-color: #1B1E24 !important;
      border-radius: 4px !important;
    }
    /deep/ .vc-highlight-base-end {
      opacity: 1 !important;
      background-color: #006BF5 !important;
      z-index: 1;
      width: 100% !important;
    }
    /deep/ .vc-dot {
      background-color: #006BF5 !important;
      margin-bottom: 1px;
    }
    /deep/ .vc-day.is-not-in-month *{
      opacity: 0.5;
    }
    /deep/ .vc-day-content {
      font-family: Roboto-Regular;
      font-weight: 400 !important;
      opacity: 0.85;
    }
    .input-container{
      margin-top: 16px;
      img {
        opacity: 0.6;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        margin-bottom: 4px;
        margin-top: 4px;
      }
      p {
        color: $white-500;
        display: inline;
      }
      fieldset {
        text-align: center;
        display: inline;
        border-radius: 5px;
        border-color: $white-200;
        padding: 0;
        width: 192px;
        height: 32px;
        border-width: 2px;
        input {
          font-family: "Roboto-Regular", sans-serif;
          background-color: transparent;
          outline: none;
          border: none;
          height: 100%;
          padding: 6px 0px;
          width: 80px;
          color: $white-850;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          }
      }
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
</style>
