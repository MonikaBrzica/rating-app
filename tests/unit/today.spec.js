import { shallowMount } from '@vue/test-utils'
import today from '../../src/components/today'

describe('today', () => {
  const wrapper = shallowMount(today)
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
