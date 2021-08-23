import actions from '../../src/store/actions'
import mutations from '../../src/store/mutations'
import { HTTP } from '../../api/axios'

it('"getCurrent settings" makes API call to backend and calls setSettings mutation ', () => {
    const mockSettings = {
        id:1,
        msg:"Thank you",
        numOfEmoticons:3,
        timeout:1,
    }
})