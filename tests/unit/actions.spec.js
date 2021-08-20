import actions from '../../src/store/actions'
import mutations from '../../src/store/mutations'
import { HTTP } from '../../api/axios'

jest.mock('HTTP', () => ({
    get: jest.fn(() => mockSettings)
  }))
it('"getCurrent settings" makes API call to backend and calls setSettings mutation ', () => {
    const mockSettings = {
        id:1,
        msg:"Thank you",
        numOfEmoticons:3,
        timeout:1,
    }
      
    expect (HTTP.get).toBeCalledTimes(1)
})