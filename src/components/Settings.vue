<template>
<div class="settings-container">
  <div class="title-container">
    <p class="title">Settings</p>
    <p>X</p>
  </div>
  <div class="separator"></div>
  <div class="main-container">
    <div class="left-column">
      <div class="emoticons-preview-container">
        <p>Emotions preview</p>
        <img v-for="item in this.emotionsArr"
             v-bind:key="item.id"
             :src="require('../assets/'+ item)"
             alt="Emoticon"
        >
      </div>
      <Input v-bind:data="inputsArr[0]"/>
    </div>
    <div class="right-column">
      <Input v-bind:data="inputsArr[1]"/>
      <Input v-bind:data="inputsArr[2]"/>
    </div>
  </div>
</div>
</template>

<script>
import Input from './input'
export default {
  name: 'Settings',
  components: {
    Input
  },
  data: function () {
    return {
    }
  },
  computed: {
    emotionsArr () {
      return this.$store.getters.getEmotionsArr()
    },
    inputsArr () {
      return [
        {
          legend: 'Number of emotions',
          text: 'Enter number from 3-5',
          type: 'number',
          placeholder: this.$store.state.settings.numOfEmoticons
        },
        {
          legend: 'Thank you message',
          text: '',
          type: 'text',
          placeholder: this.$store.state.settings.msg
        },
        {
          legend: 'Message timeout',
          text: 'Can be from 0-15',
          type: 'number',
          placeholder: this.$store.state.settings.timeout
        }]
    }
  },
  methods: {
  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
.settings-container{
  width: 1015px;
  height: 100vh;
  background-color: #2D3038;
  padding: 2rem 3rem;
  .title-container{
    padding: 34px 0 34px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: rgba(255, 255, 255, 0.85);
      font-family: Roboto-Bold;
      font-size: 24px;
      line-height: 29px;
    }
  }

  .separator {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 1px 0 0 rgba(128, 134, 139, 0.3), 0 -1px 0 0 rgba(128, 134, 139, 0.3);
    height: 1px;
    margin-bottom: 40px;
  }
  .main-container{
    display: flex;
    .left-column{
      width: 48.5%;
      margin-right: 1.5%;
      .emoticons-preview-container{
        color: rgba(255, 255, 255, 0.5);
        img{
          height: 24px;
          width: 24px;
          margin-right: 12px;
        }
        font-family: Roboto-Medium;
        font-size: 12px;
        line-height: 16px;
      }
    }
    .right-column{
      width: 48.5%;
      margin-left: 1.5%;
    }
  }
}

</style>
