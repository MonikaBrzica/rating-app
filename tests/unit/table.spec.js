import { shallowMount, createLocalVue } from '@vue/test-utils'
import Table from '../../src/components/table'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  actions: {
  },
  state: {
      ratings: [
          {
              emojiId: 1,
              date: '2021-08-16T06:00:00Z'
          },
          {
            emojiId: 2,
            date: '2021-08-16T07:00:00Z'
        }
      ]
  },
  getters: {
    getSumRatings (state) {
        const ratings = state.ratings
        const series = [0, 0, 0, 0, 0]
        if (ratings !== null) {
          for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].emojiId === 1) {
              series[0]++
            }
            if (ratings[i].emojiId === 2) {
              series[1]++
            }
            if (ratings[i].emojiId === 3) {
              series[2]++
            }
            if (ratings[i].emojiId === 4) {
              series[3]++
            }
            if (ratings[i].emojiId === 5) {
              series[4]++
            }
          }
        }
        return series
      }
  }
})

describe('table', () => {
  const wrapper = shallowMount(Table, {
    store,
    localVue
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
