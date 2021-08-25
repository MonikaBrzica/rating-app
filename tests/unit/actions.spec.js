import mockAxios from 'jest-mock-axios'
import actions from '../../src/store/actions'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from './utils/store-config'
import { cloneDeep } from 'lodash'

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset()
})
describe('actions', () => {
  it('action getCurrentSettings should get data from the server', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    // settings should be empty
    expect(store.state.settings).toStrictEqual({})
    store.dispatch('getCurrentSettings')
    const response = {
      data: {
        ratingSettings: {
          id: 1,
          msg: 'Thank you',
          timeout: 5,
          numOfEmoticons: 4
        }
      }
    }
    mockAxios.mockResponse(response)
    // settings should have data
    expect(store.state.settings).toBe(response.data.ratingSettings)
    // http GET request should have been called
    expect(mockAxios.get).toHaveBeenCalledWith('/rating/current-settings')
  })
  it('action getEmojiArray should get data from the server', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    // emoticons should be empty array
    expect(store.state.emoticons).toStrictEqual([])
    
    store.dispatch('getEmojiArray')

    const response = {
      data: {
        emojiList: [
          {
              color: "rgb(0, 168, 107)",
              id: 1,
              image: "https://res.cloudinary.com/dxlyytkww/image/upload/v1627541878/RatingApp/very_happy_ujm04f.svg",
              name: "VERY_HAPPY"
          },
          {
              color: "rgb(202,202,202)",
              id: 3,
              image: "https://res.cloudinary.com/dxlyytkww/image/upload/v1627541877/RatingApp/meh_owc1iz.svg",
              name: "MEH"
          },
          {
              color: "rgb(249, 88, 90)",
              id: 5,
              image: "https://res.cloudinary.com/dxlyytkww/image/upload/v1627541878/RatingApp/very_sad_rwkai6.svg",
              name: "VERY_SAD"
          }
      ]
      }
    }
    mockAxios.mockResponse(response)
    // emoticons should have data
    expect(store.state.emoticons).toBe(response.data.emojiList)
    // http GET request should have been called
    expect(mockAxios.get).toHaveBeenCalledWith('/emoji');
  })
  it('action postRating should send POST request with id as payload', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))

    let id = 5
    store.dispatch('postRating', id)

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith('/rating', {"emojiId": 5});
    
  })
  it('action storeUser should send POST request to server with access token as payload', () => {
    // init store
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    let user = {
      fullname: '',
      email: '',
      imgSrc: '',
      loggedIn: false,
      token: '',
      role: null
    }
    // state user should be empty
    expect(store.state.user).toStrictEqual(user)
    // mocking data for action dispatch
    let data = {
      token: 'token',
      info: {
        email: "test@gmail.com",
        family_name: "last",
        given_name: "first",
        id: "116389222897858339968",
        locale: "hr",
        name: "First last",
        picture: "https://lh3.googleusercontent.com/a/AATXAJz8ylYCpMCsc3n7uIdhdxAg1G8",
        verified_email: true
      }
    }
    store.dispatch('storeUser', data)
    // mocking response from backend 
    let response = {
      data: {
        role: "ADMIN"
      }
    }
    mockAxios.mockResponse(response)
    // mocking expected result after action dispatch
    user = {
      fullname: 'First last',
      email: 'test@gmail.com',
      imgSrc: 'https://lh3.googleusercontent.com/a/AATXAJz8ylYCpMCsc3n7uIdhdxAg1G8',
      loggedIn: true,
      token: 'token',
      role: 'admin'
    }
    // expect state user to match to mocked data
    expect(store.state.user).toStrictEqual(user);
    // expect HTTP POST to have been called with params
    expect(mockAxios.post).toHaveBeenCalledWith('auth', {"accessToken": 'token'});
  })
  it('action getReports should send POST request to server with access token as auth bearer and two dates, after that it should store it in state.ratings', () => {
    // init store
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    expect(store.state.ratings).toStrictEqual([])

    // mocking data for action dispatch
    let data = {
      dateFirst: "2021-08-24T06:15:02.115Z",
      dateEnd: "2021-08-24T08:15:02.115Z"
    }
    store.dispatch('getReports', data)
    // mocking response from backend 
    let response = {
      data: {
        ratings: [
          {
            date: "2021-08-25T06:06:27Z",
            emojiId: 4
          },
          {
            date: "2021-08-25T06:06:20Z",
            emojiId: 3
          }
        ]
      }
    }
    mockAxios.mockResponse(response)
    // mocking expected data
    let ratings = [
      {
        "date": "2021-08-25T06:00:00.000Z",
        "emojiId": 4
      }, 
      {"date": "2021-08-25T06:00:00.000Z",
      "emojiId": 3
    }
  ]
    expect(store.state.ratings).toStrictEqual(ratings);
    expect(mockAxios.post).toHaveBeenCalledWith("rating/statistics", {"endDate": "2021-08-24T08:15:02.115Z", "startDate": "2021-08-24T06:15:02.115Z"},{"headers": {"Authorization": "Bearer null"}});
  })
  it('action checkToken should send GET request to google server with access token', () => {
    // init store
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    store.dispatch('checkToken')
    let response = {
      data: {
        email: "test@gmail.com",
        family_name: "last",
        given_name: "first",
        id: "116389222897858339968",
        locale: "hr",
        name: "First last",
        picture: "https://lh3.googleusercontent.com/a/AATXAJz8ylYCpMCsc3n7uIdhdxAg1G8",
        verified_email: true
      }
    }
    mockAxios.mockResponse(response)
    
    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledWith("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {"headers": {"Authorization": "Bearer null"}});
  })
  it('action changeSettings should send PUT request to server with access token as auth bearer and updated settings object as payload', () => {
    let state = {
      user: {
        token: 'token'
      }
    }
    let updatedSettings = {
      id: 1,
      msg: "Thank you for your rating",
      numOfEmoticons: 4,
      timeout: 2
    }

    actions.changeSettings({ state }, updatedSettings)

    expect(mockAxios.put).toHaveBeenCalled();
    expect(mockAxios.put).toHaveBeenCalledWith("rating/settings", {"id": 1, "msg": "Thank you for your rating", "numOfEmoticons": 4, "timeout": 2}, {"headers": {"Authorization": "Bearer token"}});
  })
  it('action logoutUser should send POST request to server with access token and push user to public, delete user from store and delete token from local storage', () => {
    // init store
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    store.state.user = {
      fullname: 'First last',
      email: 'test@gmail.com',
      imgSrc: 'https://lh3.googleusercontent.com/a/AATXAJz8ylYCpMCsc3n7uIdhdxAg1G8',
      loggedIn: true,
      token: 'token',
      role: 'admin'
    }
    store.dispatch('logoutUser')
    expect(mockAxios.post).toHaveBeenCalledWith("auth/revoke", {"accessToken": "token"});
  })
  it('action setRatings should take reports format them and store them in store.ratings', () => {
    // init store
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    let data = {
      ratings: []
    }
    store.dispatch('setRatings',data)
    // state ratings should equal to an empty string
    expect(store.state.ratings).toStrictEqual([])

    data = {
      ratings: [
        {
          "date": "2021-08-25T06:05:01.523Z",
          "emojiId": 4
        }, 
        {"date": "2021-08-25T06:34:59.145Z",
        "emojiId": 3
        }
      ]
    }
    let mockRatings = [
      {
        "date": "2021-08-25T06:00:00.000Z",
        "emojiId": 4
      },
      {
        "date": "2021-08-25T06:00:00.000Z",
        "emojiId": 3
      }
    ]
    store.dispatch('setRatings', data)
    // ratings should equal to mock ratings
    expect(store.state.ratings).toStrictEqual(mockRatings)

    data = {
      ratings: [
        {
          "date": "2021-08-25T06:05:01.523Z",
          "emojiId": 4
        }, 
        {"date": "2021-08-25T06:34:59.145Z",
        "emojiId": 3
        }
      ],
      difference: 5
    }

    mockRatings = [
      {
        "date": "2021-08-25T00:00:00.000Z",
        "emojiId": 4
      },
      {
        "date": "2021-08-25T00:00:00.000Z",
        "emojiId": 3
      }
    ]
    store.dispatch('setRatings', data)
    expect(store.state.ratings).toStrictEqual(mockRatings)
  })
})
