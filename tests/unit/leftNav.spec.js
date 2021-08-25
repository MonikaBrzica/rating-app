import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import leftNav from '../../src/components/leftNav'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {}
const state = {
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
    token: 'ya.45644fds5af4ds56f4ds5f4ds5a6f4d5sf45s64fd5s64fds4f56ds4fds1vcsa46'
  },
  settings: {},
  emoticons: [],
  emotionsArr: ['very_happy.svg', 'happy.svg', 'meh.svg', 'sad.svg', 'very_sad.svg']
}
const getters = {
  getNav (state) {
    return state.nav.filter((e) => {
      return e.id !== 3
    })
  },
  getSettings (state) {
    return state.settings
  },
  getEmoticons (state) {
    return state.emoticons
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
  }
}
const store = new Vuex.Store({
  actions,
  state,
  getters
})

describe('leftNav', () => {
  const wrapper = mount(leftNav, {
    store,
    localVue,
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('changes show modal on function call', () => {
    wrapper.vm.itemClicked()
    expect(wrapper.vm.showModal).toBe(true)
  })
})
