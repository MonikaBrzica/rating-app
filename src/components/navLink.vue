<template>
  <router-link tag="li"
               :to="this.data.link"
               active-class="active">
    <div class="item" v-on:click="itemClicked(data.id)">
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
    return {
    }
  },
  methods: {
    itemClicked: function (id) {
      if (id === 3) {
        this.$emit('show')
      }
    }
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
    font-family: 'Roboto-Medium';
    text-align: center;
    font-size: 12px;
    word-spacing: 16px;
    color: #FFF;
    margin: 0;
  }
}
@media only screen and (max-width: 768px) {
  li {
    width: 64px;
    height: 60px;
    display: inline;
  }
    .item {
      width: 64px;
      height: 60px;
      padding-top: 0;
      p {
        font-family: 'Roboto-Medium';
        font-size: 10px;
        word-spacing: 10px;
      }
    }
  }

</style>
