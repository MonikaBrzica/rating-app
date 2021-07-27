import { shallowMount } from '@vue/test-utils'
import navLink from '../../src/components/navLink'

describe('navLink', () => {
  const wrapper = shallowMount(navLink, {
    propsData: {
      data: [
        {
          id: 1,
          text: 'Today',
          src: 'view-dashboard.svg',
          link: '/'
        },
        {
          id: 2,
          text: 'Reports',
          src: 'file-document.svg',
          link: '/reports'
        },
        {
          id: 3,
          text: 'Settings',
          src: 'cog.svg',
          link: ''
        }
      ]
    }
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
