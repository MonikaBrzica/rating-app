<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
      <v-date-picker v-model="range"
                     :value="null"
                     is-dark
                     :attributes='attrs'
                     is-range
                     @dayclick="onDayClick" >
        <template v-slot="{ inputValue, inputEvents }">
          <div class="flex justify-center items-center">
            <input
              :value="inputValue.start"
              v-on="inputEvents.start"
              class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
            />
            <input
              :value="inputValue.end"
              v-on="inputEvents.end"
              class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
            />
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
      range: {
        start: '',
        end: ''
      },
      attrs: [
        {
          key: 'today',
          dot: true
        }
      ]
    }
  },
  methods: {
    onDayClick () {
      if (this.range.end !== '' && this.range.start !== '') {
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
      }
    }
  },
  computed: {
    dateFirst () {
      const event = this.range.start
      return event
    },
    dateEnd () {
      const event = this.range.end
      return event
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
    margin-top: 64px;
    width: calc(100% - 164px);
    order:2;
    .pie {
      width: 419px;
      height: 432px;
    }
    .table-container {
      margin-top: 50px;
    }
  }
}
@media only screen and (max-width: 768px) {
  .reports {
  .main-reports {
    width: 100vh;
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
