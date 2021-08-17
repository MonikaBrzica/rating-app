import { shallowMount,createLocalVue } from '@vue/test-utils'
import reports from '../../src/components/reports'
import { RouterLinkStub } from '@vue/test-utils'
import VCalendar from 'v-calendar'

const localVue = createLocalVue()
localVue.use(VCalendar)
describe('reports', () => {
  const wrapper = shallowMount(reports, {
    computed: {
      maxDate () {
        return 'Mon Aug 16 2021 11:22:19 GMT+0200 (Central European Summer Time)'
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
