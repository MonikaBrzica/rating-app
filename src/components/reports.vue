<template>
  <div class="reports">
    <LeftNav/>
    <div class="main-reports">
  </div>
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
import store from '../store'
import axios from 'axios'
export default {
  name: 'Reports',
  components: {
    LeftNav,
    RightNav
  },
  created () {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(response => {
          store.dispatch('checkToken', { token: token, info: response.data })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.reports {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .main-reports {
    width: calc(100% - 164px);
    order:2;
  }
}
@media only screen and (max-width: 768px) {
  .reports {
  }
}
</style>
