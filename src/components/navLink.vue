<template>
  <router-link tag="li"
               :to="this.data.link"
               active-class="active">
    <div class="item">
      <img :src="require('../assets/'+ this.data.src)"
           alt="Emoticon">
      <p>{{this.data.text}}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'NavLink',
  props: {
    data: Object
  },
  data: function () {
    return {}
  }
}
</script>
<style lang="scss">
li.router-link-active,
li.router-link-exact-active {
  background-color: #3E4148;
  opacity: 1;
}
a{
  text-decoration: none;
}
li{
  list-style: none;
  opacity: 0.5;
}
.item {
  width: 100px;
  height: 72px;
  text-align: center;
  padding-top: 10px;
  img {
    margin-top: 10px;
  }
  p {
    font-family: Roboto-Medium;
    text-align: center;
    font-size: 12px;
    word-spacing: 16px;
    color: #FFF;
    margin: 0;
  }
}
</style>
