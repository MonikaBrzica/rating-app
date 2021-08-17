import { shallowMount, createLocalVue } from '@vue/test-utils'
import rightNav from '../../src/components/rightNav'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  actions: {
    logoutUser ({ state }) {
      localStorage.removeItem('token')
      HTTP.post('auth/revoke', {
        accessToken: state.user.token
      }).then(() => router.push('/'))
        .then(() => localStorage.removeItem('token'))
    }
  },
  state: {
    user: {
      imgSrc: 'src',
      fullname: 'Ivan'
    }
  }
})

describe('rightNav', () => {
  const wrapper = shallowMount(rightNav, {
    store,
    localVue
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should have logout method', function () {
    expect(typeof wrapper.vm.logOut).toBe('function')
  })
})
