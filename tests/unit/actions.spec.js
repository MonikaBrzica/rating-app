import mockAxios from 'jest-mock-axios'
import actions from '../../src/store/actions'
import commit from '../../src/store/mutations'
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset()
})
describe('actions', () => {
  it('action getCurrentSettings should get data from the server', () => {
    let commitFn = jest.fn()

    actions.getCurrentSettings({commitFn})

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledWith('/rating/current-settings');
    
  })
  it('action getEmojiArray should get data from the server', () => {
    let commitFn = jest.fn()

    actions.getEmojiArray({commitFn})

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledWith('/emoji');
  })
  it('action postRating should send POST request with id as payload', () => {
    let commitFn = jest.fn()
    let id = 5
    actions.postRating({commitFn}, id)

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith('/rating', {"emojiId": 5});
    
  })
  it('action storeUser should send POST request to server with access token as payload', () => {
    let commitFn = jest.fn()
    let data = {
      token: 'token'
    }

    actions.storeUser({commitFn}, data)

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith('auth', {"accessToken": 'token'});
  })
  it('action getReports should send POST request to server with access token as auth bearer and two dates', () => {
    let dispatchFn = jest.fn()
    let data = {
      dateFirst: "2021-08-24T06:15:02.115Z",
      dateEnd: "2021-08-24T08:15:02.115Z"
    }
    actions.getReports({dispatchFn}, data)

    expect(mockAxios.post).toHaveBeenCalled();
    expect(mockAxios.post).toHaveBeenCalledWith("rating/statistics", {"endDate": "2021-08-24T08:15:02.115Z", "startDate": "2021-08-24T06:15:02.115Z"},{"headers": {"Authorization": "Bearer null"}});
  })
  it('action checkToken should send GET request to google server with access token', () => {
    let dispatchFn = jest.fn()
    actions.checkToken({ dispatchFn })

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
})
