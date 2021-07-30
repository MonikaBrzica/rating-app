<template>
  <div class="settings-container">
    <div class="title-container">
      <p class="title">Settings</p>
      <img src="../assets/images/cancel.svg"
           alt="X"
           v-on:click="closeModal">
    </div>
    <div class="separator"></div>
    <div class="main-container">
      <div class="emoticons-preview-container">
        <p>Emotions preview</p>
        <img
          v-for="item in this.emotions"
          v-bind:key="item.id"
          :src="require('../assets/images/' + item)"
          alt="Emoticon"
        />
      </div>
      <Input v-for="item in this.inputs"
             v-bind:key="item.name"
             v-bind:data="item"
             @updateEmotions="changeSelectedEmotionsNum"
             @updateSettings="updateSettings"/>
    </div>
  </div>
</template>
<script>
import Input from './inputComponent'
import { HTTP } from '../../api/axios'
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
    emotions () {
      // var that returns array of emotions that need to be displayed.
      // calling getter that takes number user selected as an argument.
      // getEmotionsArr is a mapper.
      return this.$store.getters.getEmotionsArr(this.emotionsSelected)
    },
    inputs () {
      // var stores all data about Input component.
      return [
        {
          name: 'msg',
          legend: 'Thank you message',
          text: '',
          type: 'text',
          value: this.$store.getters.getSettings.msg
        },
        {
          name: 'numOfEmoticons',
          legend: 'Number of emotions',
          text: 'Enter number from 3-5',
          type: 'number',
          value: this.$store.getters.getSettings.numOfEmoticons
        },
        {
          name: 'timeout',
          legend: 'Message timeout',
          text: 'Can be from 0-10',
          type: 'number',
          value: this.$store.getters.getSettings.timeout
        }]
    },
    emotionsSelected () {
      return this.settings.numOfEmoticons
    },
    settings () {
      return this.$store.getters.getSettings
    }
  },
  methods: {
    changeSelectedEmotionsNum (data) {
      // method that is called on updateEmotions event.It takes new value and sets it in settings.
      this.settings.numOfEmoticons = parseInt(data)
    },
    updateSettings (data) {
      // method that is called on updateSettings event.
      // copying settings.
      const updatedSettings = this.settings
      // if block that sets msg to null if it is empty.
      // This is because the msg can be empty and it is stored as null in database.
      if (data.name === 'msg' && data.value === '') {
        data.value = null
      }
      // for block that goes through all properties from updatedSettings object.
      for (const property in updatedSettings) {
        // if block that updates correct value in object.
        if (property === data.name) {
          updatedSettings[property] = data.value
        }
      }
      // PUT request sent to backend to store updated settings.
      HTTP.put('rating/settings', updatedSettings, {
        headers: { Authorization: 'Bearer ' + this.$store.state.user.token }
      })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.settings-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: $bg;
  padding: 2rem 3rem;
  .title-container {
    padding: 2rem 0 2rem 1rem;
    display: flex;
    justify-content: space-between;
    p {
      color: $white-850;
      font-family: 'Roboto-Bold', sans-serif;
      font-size: 1.5rem;
      line-height: 29px;
    }
    img {
      height: 20px;
      width: 20px;
      margin: 1.5rem 0;
    }
  }
  .separator {
    background-color: $white-100;
    box-shadow: 0 1px 0 0 $white-100,
    0 -1px 0 0 $white-100;
    height: 1px;
    margin-bottom: 2.5rem;
  }
  .main-container {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1.5rem;
    row-gap: 1.25rem;
    .emoticons-preview-container {
      color: $white-500;
      flex-basis: calc(50% - 1.5rem);
      img {
        height: 24px;
        width: 24px;
        margin-right: 0.75rem;
      }
      font-family: 'Roboto-Medium',sans-serif;
      font-size: 12px;
      line-height: 16px;
    }
  }
}
/* Media query  */
@media only screen and (max-width: 768px) {
  .settings-container{
    width: 100%;
    padding: 10px;
    .main-container {
      display: unset;
      width: 100%;
    }
    .emoticons-preview-container{
      flex-basis: 100%!important;
      text-align: center;
    }
  }
}
</style>
