import { shallowMount } from '@vue/test-utils'
import reports from '../../src/components/reports'

describe('reports', () => {
  const wrapper = shallowMount(reports)
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
