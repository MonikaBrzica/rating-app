import { shallowMount, createLocalVue } from '@vue/test-utils'
import Public from '../../src/views/public'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Public', () => {
  let getters
  let store
  let state
  beforeEach(() => {
    getters = {
      getSettings (state) {
        return state.settings
      },
      getEmoticons (state) {
        return state.emoticons
      }
    }
    state = {
      settings: {
        id: 1,
        msg: 'Thank you',
        numOfEmoticons: 3,
        timeout: 1
      },
      emoticons: [{
        color: 'rgb(0, 168, 107)',
        id: 1,
        image: 'https://res.cloudinary.com/dxlyytkww/image/upload/v1627541878/RatingApp/very_happy_ujm04f.svg',
        name: 'VERY_HAPPY'
      },
      {
        color: 'rgb(65, 179, 233)',
        id: 2,
        image: 'https://res.cloudinary.com/dxlyytkww/image/upload/v1627541876/RatingApp/happy_mlvvqt.svg',
        name: 'HAPPY'
      }, {
        color: 'rgb(122, 122, 122)',
        id: 3,
        image: 'https://res.cloudinary.com/dxlyytkww/image/upload/v1627541877/RatingApp/meh_owc1iz.svg',
        name: 'MEH'

      }, {
        color: 'rgb(255, 186, 19)',
        id: 4,
        image: 'https://res.cloudinary.com/dxlyytkww/image/upload/v1627541878/RatingApp/sad_vokr45.svg',
        name: 'SAD'
      }, {
        color: 'rgb(249, 88, 90)',
        id: 5,
        image: 'https://res.cloudinary.com/dxlyytkww/image/upload/v1627541878/RatingApp/very_sad_rwkai6.svg',
        name: 'VERY_SAD'

      }]
    }
    store = new Vuex.Store({
      getters,
      state
    })
  })
  it('renders correctly', () => {
    const wrapper = shallowMount(Public, {
      store,
      localVue
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
