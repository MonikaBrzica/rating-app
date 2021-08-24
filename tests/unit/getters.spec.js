import getters from '../../src/store/getters'
import state from '../../src/store/state'
describe('getters', () => {
    it ('"getSettings" returns current settings from state', () => {
        state.settings = {
            id:1,
            msg:"Thank",
            numOfEmoticons:3,
            timeout:1
        }
        const settings = {
            id:1,
            msg:"Thank",
            numOfEmoticons:3,
            timeout:1
        }
        expect(getters.getSettings(state)).toStrictEqual(settings)
    })
    it ('"getEmoticons" returns current emoticons from state', () => {
        state.emoticons = [
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
        const emoticons = [
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
        expect(getters.getEmoticons(state)).toStrictEqual(emoticons)
    })
    it ('"getRatings" returns current ratings from state', () => {
        state.ratings = [
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:1
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:2
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:3
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:4
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:5
            }
        ]
        const ratings = [
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:1
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:2
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:3
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:4
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:5
            }
        ]
        expect(getters.getRatings(state)).toStrictEqual(ratings)
    })
    it ('"getNav" returns current nav from state', () => {
        const nav = [
            {
              id: 1,
              text: 'Today',
              src: 'view-dashboard.svg',
              link: '/today'
            },
            {
              id: 2,
              text: 'Reports',
              src: 'file-document.svg',
              link: '/reports'
            }
          ]
        expect(getters.getNav(state)).toStrictEqual(nav)
    })
    it ('"getSumRatings" returns empty array of ratings from state for pie chart', () => {
        state.ratings = []
        const ratings = [0, 0, 0, 0, 0]
        expect(getters.getSumRatings(state)).toStrictEqual(ratings)
    })
    it ('"getSumRatings" returns array of ratings from state for pie chart', () => {
        state.ratings = [
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:1
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:2
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:3
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:4
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:5
            }
        ]
        const ratings = [1, 1, 1, 1, 1]
        expect(getters.getSumRatings(state)).toStrictEqual(ratings)
    })
    it ('"getSumRatingsLine" returns empty arrays of ratings from state for line chart', () => {
        state.ratings = []
        const ratings = [
            [],
            [],
            [],
            [],
            [],
            []
        ]
        expect(getters.getSumRatingsLine(state)).toStrictEqual(ratings)
    })
    it ('"getSumRatingsLine" returns correct arrays of ratings from state for line chart', () => {
        state.ratings = [
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:1
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:2
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:3
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:4
            },
            {
                date:"2021-08-19T06:00:00.000Z",
                emojiId:5
            }
        ]
        const ratings = [
            [1],
            [1],
            [1],
            [1],
            [1],
            ["2021-08-19T06:00:00.000Z"]
        ]
        expect(getters.getSumRatingsLine(state)).toStrictEqual(ratings)
    })
})
