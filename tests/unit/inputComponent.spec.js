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
  it('should emit updateSettings event', function () {
    wrapper.vm.updateData('msg', 'HelloWorld')
    expect(wrapper.emitted().updateSettings).toBeTruthy()
  })
  it('should have updateEmotionsPreview method', function () {
    wrapper.vm.updateData('numOfEmoticons', 5)
    expect(typeof wrapper.vm.updateEmotionsPreview).toBe('function')
  })
  it('should set dataValidated to false (numOfEmoticons, 8)', function () {
    wrapper.vm.validateData('numOfEmoticons', 8)
    expect(wrapper.vm.dataValidated).toBe(false)
  })
  it('should set dataValidated to true (numOfEmoticons, 5)', function () {
    wrapper.vm.validateData('numOfEmoticons', 5)
    expect(wrapper.vm.dataValidated).toBe(true)
  })
  it('should set dataValidated to false (msg, Th)', function () {
    wrapper.vm.validateData('msg', 'Th')
    expect(wrapper.vm.dataValidated).toBe(false)
  })
  it('should set dataValidated to true (msg, Thanks)', function () {
    wrapper.vm.validateData('msg', 'Thanks')
    expect(wrapper.vm.dataValidated).toBe(true)
  })
  it('should set dataValidated to false (timeout, 11)', function () {
    wrapper.vm.validateData('timeout', 11)
    expect(wrapper.vm.dataValidated).toBe(false)
  })
  it('should set dataValidated to true (timeout, 5)', function () {
    wrapper.vm.validateData('timeout', 5)
    expect(wrapper.vm.dataValidated).toBe(true)
  })
})
