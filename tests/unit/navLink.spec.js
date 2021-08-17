import { shallowMount, createLocalVue } from '@vue/test-utils'
import navLink from '../../src/components/navLink'
import { RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  actions: {
  },
  state: {
  }
})

describe('navLink', () => {
  const wrapper = shallowMount(navLink, {
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
