import { shallowMount, createLocalVue } from '@vue/test-utils'
import PieChart from '../../src/components/pieChart'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  actions: {
  },
  state: {
  },
  getters: {
  }
})

describe('pieChart', () => {
  const wrapper = shallowMount(PieChart, {
    store,
    localVue
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
