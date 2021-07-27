import { mount, createLocalVue } from '@vue/test-utils'
import InputComponent from '../../src/components/inputComponent'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
  state: {
    settings: {},
    emoticons: [],
    emotionsArr: ['very_happy.svg', 'happy.svg', 'meh.svg', 'sad.svg', 'very_sad.svg']
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
describe('InputComponent', () => {
  const wrapper = mount(InputComponent, {
    store,
    localVue,
    propsData: {
      data: {
        legend: 'Thank you message',
        name: 'msg',
        text: '',
        type: 'text',
        value: 'FSdn'
      }
    }
  })
  wrapper.setData({
    dataValidated: true
  })
  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should have updateData method', function () {
    expect(typeof wrapper.vm.updateData).toBe('function')
  })
  wrapper.vm.updateData('numOfEmoticons', 3)
  it('should emit updateSettings  event', function () {
    expect(wrapper.emitted().updateSettings).toBeTruthy()
  })
  it('should emit updateEmotions event', function () {
    expect(wrapper.emitted().updateEmotions).toBeTruthy()
  })
  it('should have updateEmotionsPreview method', function () {
    expect(typeof wrapper.vm.updateEmotionsPreview).toBe('function')
  })
  wrapper.vm.validateData('numOfEmoticons', 8)
  it('should set dataValidated to false (numOfEmoticons, 8)', function () {
    expect(wrapper.vm.dataValidated).toBe(false)
  })
  wrapper.vm.validateData('msg', 'Th')
  it('should set dataValidated to false (msg, Th)', function () {
    expect(wrapper.vm.dataValidated).toBe(false)
  })
  wrapper.vm.validateData('timeout', 11)
  it('should set dataValidated to false (timeout, 11)', function () {
    expect(wrapper.vm.dataValidated).toBe(false)
  })
})
