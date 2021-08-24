import { shallowMount, createLocalVue } from '@vue/test-utils'
import rightNav from '../../src/components/rightNav'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
describe('rightNav', () => {
    let actions
    let store
    let state
    beforeEach(() => {
        actions = {
          logoutUser: jest.fn()
        },
        state = {
            user: {
                fullname: 'Ivan',
                email: '',
                imgSrc: 'src',
                loggedIn: false,
                token: '',
                role: null
              }
        }
        store = new Vuex.Store({
          actions,
          state
        })
      })
  it('renders correctly', () => {
    const wrapper = shallowMount(rightNav, {
        store,
        localVue
      })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('dispatches logOutUser when Logout button is clicked', () => {
    const wrapper = shallowMount(rightNav, {
        store,
        localVue
      })
    const btn = wrapper.find('button.btn').trigger('click')
    expect(actions.logoutUser).toHaveBeenCalled()
  })
})
