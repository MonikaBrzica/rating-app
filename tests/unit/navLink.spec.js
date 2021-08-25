import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import navLink from '../../src/components/navLink'
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
  it('renders correctly', () => { 
    wrapper.vm.itemClicked(3)
    expect(wrapper.emitted().show).toBeTruthy()
  })
})
