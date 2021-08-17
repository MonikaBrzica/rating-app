import { shallowMount, createLocalVue } from '@vue/test-utils'
import leftNav from '../../src/components/leftNav'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  actions: {
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
      role: 'admin'
    }
  },
  getters: {
    getNav (state) {
      return state.nav.filter((e) => {
        return e.id !== 3
      })
    }
  }
})

describe('leftNav', () => {
  const wrapper = shallowMount(leftNav, {
    store,
    localVue
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('shows settings', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
