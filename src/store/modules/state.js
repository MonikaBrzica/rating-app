export default {
  settings: {},
  emoticons: [],
  emotionsArr: ['very_happy.svg', 'happy.svg', 'meh.svg', 'sad.svg', 'very_sad.svg'],
  user: {
    fullname: '',
    email: '',
    imgSrc: '',
    loggedIn: false,
    token: '',
    role: null
  },
  nav: [
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
    },
    {
      id: 3,
      text: 'Settings',
      src: 'cog.svg',
      link: ''
    }
  ]
}
