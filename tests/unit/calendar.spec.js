import { shallowMount, createLocalVue } from '@vue/test-utils'
import calendar from '../../src/components/calendar'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('calendar', () => {
  let getters
  let store
  let state
  beforeEach(() => {
    getters = {
    }
    state = {
    }
    store = new Vuex.Store({
      getters,
      state
    })
  })
  it('renders correctly', () => {
    const wrapper = shallowMount(calendar, {
      store,
      localVue
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
