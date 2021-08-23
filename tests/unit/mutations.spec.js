import mutations from '../../src/store/mutations'
import state from '../../src/store/state'

it('"SetSettings" sets data in state.settings', () => {
    const data = {
        id:1,
        msg:"Thank you",
        numOfEmoticons:3,
        timeout:1,
    }
    mutations.setSettings(state,data)
    expect (state.settings).toBe(data)
})
it('"SetEmoticons" sets data in state.emoticons', () => {
    const data = [
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
    mutations.setEmoticons(state, data)
    expect (state.emoticons).toBe(data)
}),
it('"StoreUser" sets data in state.user', () => {
    const data = {
        role: 'admin',
        user: {
            info: {
                email: "ivanand34@gmail.com",
                family_name: "Andric",
                given_name: "Ivan",
                id: "116389222897858339968",
                locale: "hr",
                name: "Ivan Andric",
                picture: "https://lh3.googleusercontent.com/a/AATXAJz8ylYCpMCsc3n7uIdhdxAg1G88NgtG9o7mCEaY=s96-c",
                verified_email: true
            },
            token: 'ya29.a0ARrdaM8Z-j7yIGqTaeboIT0cX7NRJZrrGkNToAkDiMsGmULEnknoWXtUWd2vJ6ZR-h_O4f5M5TZETQSGcNoSXXWL3chuBixhZAN-p_i8VIiLTR_aUOJS31AGY34aCBqU0_XSvA45O01_rLy5VT18v9slVs4V'
        }
    }
    mutations.storeUser(state,data)
    const user = {
        email:"ivanand34@gmail.com",
        fullname:"Ivan Andric",
        imgSrc:"https://lh3.googleusercontent.com/a/AATXAJz8ylYCpMCsc3n7uIdhdxAg1G88NgtG9o7mCEaY=s96-c",
        loggedIn:true,
        role:"admin",
        token:"ya29.a0ARrdaM8Z-j7yIGqTaeboIT0cX7NRJZrrGkNToAkDiMsGmULEnknoWXtUWd2vJ6ZR-h_O4f5M5TZETQSGcNoSXXWL3chuBixhZAN-p_i8VIiLTR_aUOJS31AGY34aCBqU0_XSvA45O01_rLy5VT18v9slVs4V"

    }
    expect (state.user).toStrictEqual(user)
})
it('"SetRatings" sets data in state.ratings', () => {
    const data = [
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
    mutations.setRatings(state,data)
    expect (state.ratings).toBe(data)
})
it('"logoutUser" deletes data in state.user', () => {
    mutations.logoutUser(state)
    const user = {
        fullname: '',
        email: '',
        imgSrc: '',
        loggedIn: false,
        token: ''
      }
    expect (state.user).toStrictEqual(user)
})
it('"clearRatings" deletes data in state.ratings', () => {
    mutations.clearRatings(state)
    expect (state.ratings.length).toBe(0)
})