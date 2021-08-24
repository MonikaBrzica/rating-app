import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import today from '../../src/components/today'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('today', () => {
    let actions
    let store
    beforeEach(() => {
        actions = {
          getReports: jest.fn(),
          checkToken: jest.fn()
        }
        store = new Vuex.Store({
          actions
        })
      })
  it('renders correctly', () => {
    const wrapper = shallowMount(today, {
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
    expect(wrapper.element).toMatchSnapshot()
  })
})
