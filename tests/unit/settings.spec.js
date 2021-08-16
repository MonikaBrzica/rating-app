import { mount, createLocalVue } from '@vue/test-utils'
import Settings from '../../src/components/settings'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    settings: {},
    emoticons: [],
    emotionsArr: ['very_happy.svg', 'happy.svg', 'meh.svg', 'sad.svg', 'very_sad.svg'],
    user: {
      user: {
        token: 'ya.45644fds5af4ds56f4ds5f4ds5a6f4d5sf45s64fd5s64fds4f56ds4fds1vcsa46'
      }
    }
  },
  getters: {
    getSettings (state) {
      return state.settings
    },
    getEmoticons (state) {
      return state.emoticons
    },
    getEmotionsArr: (state) => (count) => {
      if (count === 5) {
        return state.emotionsArr
      }
      if (count === 4) {
        return state.emotionsArr.filter(element => {
          if (element !== 'sad.svg') {
            return element
          }
        })
      }
      if (count === 3) {
        return state.emotionsArr.filter(element => {
          if (element !== 'sad.svg' && element !== 'happy.svg') {
            return element
          }
        })
      }
    }
  }
})
describe('Settings', () => {
  const wrapper = mount(Settings, {
    store,
    localVue
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should have changeSelectedEmotionsNum method', function () {
    expect(typeof wrapper.vm.changeSelectedEmotionsNum).toBe('function')
  })
  wrapper.vm.changeSelectedEmotionsNum('5')
  it('should set settings.numOfEmoticons to 5', function () {
    expect(wrapper.vm.settings.numOfEmoticons).toEqual(5)
  })
  it('should have updateSettings method', function () {
    expect(typeof wrapper.vm.updateSettings).toBe('function')
  })
  wrapper.vm.updateSettings({ name: 'msg', value: 'Thanks' })
})
