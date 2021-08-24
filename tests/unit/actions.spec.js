import actions from '../../src/store/actions'
import mutations from '../../src/store/mutations'
import { HTTP } from '../../api/axios'

describe('test save', () => {
  const mockSettings = {
    id: 1,
    msg: 'Thank you',
    numOfEmoticons: 3,
    timeout: 1
  }
  let mockGet = jest.SpyInstance

  beforeEach(() => {
    mockGet = jest.spyOn(HTTP, 'post')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  it('"getCurrent settings" makes API call to backend and calls setSettings mutation ', async () => {
    const commitMock = jest.fn()
    await actions.getCurrentSettings({ commitMock })
    expect(mockGet).toHaveBeenCalled()
  })
})
