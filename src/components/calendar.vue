<template>
  <v-date-picker v-model="range"
                 class='date-picker'
                 :value="null"
                 is-range
                 is-dark
                 :select-attribute="selectAttribute"
                 :first-day-of-week="2"
                 :attributes='attrs'
                 :max-date="maxDate"
                 @dayclick="onDayClick"
                 :masks="{ input: ['DD/MM/YYYY']}">
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
</template>
<script>
import store from '../store'

export default {
  name: 'Calendar',
  data () {
    return {
      selectedDay: null,
      maxDate: new Date(),
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
        start: new Date().setUTCHours(0, 0, 0, 0),
        end: new Date()
      }
    }
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
  methods: {
    onDayClick (day) {
      this.selectedDay = day.date
      const updateMaxDate = new Date(this.selectedDay)
      const diffInMs = new Date() - updateMaxDate
      const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))
      if (diffInDays < 30) {
        this.maxDate = new Date()
      } else {
        this.maxDate = this.addDays(updateMaxDate, 31)
      }
      store.dispatch('getReports', { dateFirst: this.dateFirst, dateEnd: this.dateEnd })
    },
    addDays (theDate, days) {
      return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
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

<style scoped lang="scss">
  .date-picker  {
    /deep/ .vc-container.vc-is-dark {
      color: rgba(255, 255, 255, 0.85);
      background-color: #2D3038;
      border-color: #2D3038;
    }

    /deep/ .vc-is-dark .vc-title {
      color: rgba(255, 255, 255, 0.85);
      font-family: "Roboto-Medium";
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
    /deep/ .vc-day.is-not-in-month * {
      opacity: 0.5;
    }
    /deep/ .vc-day-content {
      font-family: "Roboto-Regular";
      font-weight: 400 !important;
      opacity: 0.85;
    }
    /deep/ .vc-highlight {
      background-color: #1B1E24 !important;
      width: 100% !important;
      border-radius: 4px !important;
      border-style: none !important;
      z-index: 1 !important;
    }
    /deep/ .vc-highlight.vc-highlight-base-middle {
      border-radius: 4px !important;
    }
    /deep/ .vc-highlight.vc-highlight-base-start {
      width: 100% !important;
      border-radius: 4px !important;
    }
    /deep/ .vc-highlight.vc-highlight-base-end {
      opacity: 1 !important;
      background-color: #006BF5 !important;
      z-index: 2 !important;
      width: 100% !important;
      border-radius: 4px !important;
    }

    /deep/ .vc-dot {
      background-color: #006BF5 !important;
      margin-bottom: 1px;
    }
    .input-container {
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
          padding: 6px 0;
          width: 80px;
          color: $white-850;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
