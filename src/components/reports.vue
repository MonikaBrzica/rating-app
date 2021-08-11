<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
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
      <div class="pie">
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
  name: 'Reports',
  components: {
    LeftNav,
    RightNav,
    PieChart,
    Table
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
        start: new Date().setDate(1),
        end: new Date()
      }
    }
  },
  methods: {
    onDayClick () {
      this.$store.dispatch('getReports', { start: this.dateFirst, end: this.dateEnd })
    }
  },
  created () {
    const event = new Date()
    event.setDate(1)
    this.$store.dispatch('getReports', { start: event, end: new Date() })
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
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .main-reports {
    margin-left: 16px;
    width: calc(100% - 164px);
    order:2;
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
    .pie {
      width: 419px;
      height: 432px;
    }
    .table-container {
      margin-top: 50px;
    }
    .input-container{
      margin-top: 16px;
      margin-bottom: 16px;
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
  }
}
@media only screen and (max-width: 768px) {
  .reports {
    .main-reports {
      width: 100vh;
      margin-top: 64px;
      .pie {
        margin-top: 100px;
        width: 100%;
      }
      .table-container {
        margin-top: 50px;
      }
    }
  }
}
</style>
