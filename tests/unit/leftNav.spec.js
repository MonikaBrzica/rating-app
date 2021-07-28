import { shallowMount } from '@vue/test-utils'
import leftNav from '../../src/components/leftNav'

describe('leftNav', () => {
  const wrapper = shallowMount(leftNav)
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
