import { shallowMount } from '@vue/test-utils'
import rightNav from '../../src/components/rightNav'

describe('rightNav', () => {
  const wrapper = shallowMount(rightNav)
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should have logout method', function () {
    expect(typeof wrapper.vm.logOut).toBe('function')
  })
})
