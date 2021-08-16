import { shallowMount, createLocalVue } from '@vue/test-utils'
import lineChart from '../../src/components/lineChart'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  actions: {
  },
  state: {
  },
  getters: {
    getSumRatingsLine (state) {
        const ratings = state.ratings
        const lineChart = [
          [],
          [],
          [],
          [],
          [],
          []
        ]
        if (!ratings) {
          return lineChart
        } else {
          // setting date array with elements
          // first getting all ratings, then replacing minutes and seconds
          // and pushing to array if the element isn't already in.
          ratings.forEach((elem) => {
            const remind = elem.date.slice(13)
            elem.date = elem.date.replace(remind, ':00:00Z')
            if (lineChart[5].indexOf(elem.date) === -1) {
              lineChart[5].push(elem.date)
            }
          })
          for (let i = 0; i < lineChart.length - 1; i++) {
            for (let j = 0; j < lineChart[5].length; j++) {
              lineChart[i][j] = 0
            }
          }
          ratings.forEach((elem) => {
            for (let i = 0; i < lineChart[5].length; i++) {
              if (elem.date === lineChart[5][i]) {
                lineChart[elem.emojiId - 1][i]++
              }
            }
          })
          return lineChart
        }
      }
  }
})

describe('lineChart', () => {
  const wrapper = shallowMount(lineChart, {
    store,
    localVue
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
