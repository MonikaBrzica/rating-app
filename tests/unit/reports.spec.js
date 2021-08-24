import { shallowMount,createLocalVue } from '@vue/test-utils'
import reports from '../../src/views/reports'
import { RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  actions: {
    logoutUser ({ state }) {
      localStorage.removeItem('token')
      HTTP.post('auth/revoke', {
        accessToken: state.user.token
      }).then(() => router.push('/'))
        .then(() => localStorage.removeItem('token'))
    }
  },
  state: {
    nav: [
      {
        id: 1,
        text: 'Today',
        src: 'view-dashboard.svg',
        link: '/today'
      },
      {
        id: 2,
        text: 'Reports',
        src: 'file-document.svg',
        link: '/reports'
      },
      {
        id: 3,
        text: 'Settings',
        src: 'cog.svg',
        link: ''
      }
    ],
    user: {
      role: 'admin',
      imgSrc: 'src',
      fullname: 'Ivan'
    },
    ratings: [{
      emojiId:2,
      date: 'Mon Aug 16 2021 11:22:19 GMT+0200 (Central European Summer Time)'
    }
    ],
    settings: {
        id:1,
        msg:'Thanks',
        numOfEmoticons:4,
        timeout:5
    },
    emotionsArr: ['very_happy.svg', 'happy.svg', 'meh.svg', 'sad.svg', 'very_sad.svg']
  },
  getters: {
    getNav (state) {
      return state.nav.filter((e) => {
        return e.id !== 3
      })
    },
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
    },
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
    },
    getSettings (state) {
      return state.settings
    },
    getEmotionsArr: (state) => (count) => {
      if (count === 5) {
        return state.emotionsArr
      }
      if (count === 4) {
        return state.emotionsArr.filter(element => {
          if (element !== 'sad.svg') {
            return element
          }
        })
      }
      if (count === 3) {
        return state.emotionsArr.filter(element => {
          if (element !== 'sad.svg' && element !== 'happy.svg') {
            return element
          }
        })
      }
    },
  }
})
describe('reports', () => {
  const wrapper = shallowMount(reports, {
    store,
    localVue,
    propsData: {
      data: {
        id: 1,
        text: 'Today',
        src: 'view-dashboard.svg',
        link: '/today'
      }
    },
    stubs: {
      RouterLink: RouterLinkStub
  }
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
