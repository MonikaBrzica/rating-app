<template>
  <div class="input-container"> <!-- Adding class if data is invalid -->
    <fieldset v-bind:class="{ invalidFieldset : !dataValidated }">
      <legend>{{ data.legend }}</legend>
      <input v-bind:type="data.type"
             v-bind:value=data.value
             @change.stop="updateData (data.name, $event.target.value)">
    </fieldset>
    <!-- Adding class if data is invalid -->
    <p v-bind:class="{ invalidText : !dataValidated }">{{ data.text }}</p>
  </div>
</template>

<script>
export default {
  name: 'inputComponent',
  props: {
    data: Object
  },
  data () {
    return {
      // variable used to check if the data that user inputted is valid or not.
      // It is set to true because default data from database is valid.
      dataValidated: true
    }
  },
  computed: {
  },
  methods: {
    // method that is called on data change inside input fields
    updateData (name, value) {
      // resetting variable to true
      this.dataValidated = true
      // calling validate data that takes name and value as arguments.
      this.validateData(name, value)
      // if block that checks if the input data is invalid and if it is exits updateData method
      if (!this.dataValidated) {
        return
      }
      // if block that calls updateEmotionsPreview only for numOfEmoticons input field.
      // When user inputs number from 3 to 5 little emoji pictures should change accordingly. That is achieved by calling updateEmotionsPreview method.
      if (name === 'numOfEmoticons') {
        this.updateEmotionsPreview(value)
      }
      // if block that ensures that msg input is sent as a string and timeout and number of emoticons as integers.
      if (name === 'msg') {
        this.$emit('updateSettings', { name: name, value: value })
      } else {
        this.$emit('updateSettings', { name: name, value: parseInt(value) })
      }
    },
    updateEmotionsPreview (value) {
      // emitting an event to parent and passing number of emojis user selected.
      this.$emit('updateEmotions', parseInt(value))
    },
    validateData (name, value) {
      // method that checks data. If any of the rules is broken method returns, if data is validated dataValidated is set to true.
      // resetting var dataValidated to false
      this.dataValidated = false
      // if block used for checking number of emojis
      if (name === 'numOfEmoticons') {
        // if block validating that value is a number
        // Rule value can only be between 3 and 5 and has to be a number.
        if (!this.isinRange(2, value, 6) || isNaN(value)) {
          return
        }
      }
      // if block used for checking message
      if (name === 'msg') {
        // Rule msg can be empty.
        if (value.length === 0) {
          this.dataValidated = true
          return
        }
        // Rule Min for message is 3 and max is 120
        if (!this.isinRange(2, value.length, 121)) {
          return
        }
      }
      // if block used for checking timeout number
      if (name === 'timeout') {
        // Rule timeout is between 0 and 10.
        if (!this.isinRange(-1, value, 11) || isNaN(value)) {
          return
        }
      }
      this.dataValidated = true
    },
    isinRange (min, value, max) {
      return min < value && max > value
    }
  }
}
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
  .input-container{
    margin: 0 auto;
  }
}
/* Invalid data input styles */
.invalidFieldset {
  animation: invalidField 1s ease 0s 1 normal none;
}
.invalidText{
  color: $red !important;
}
/*  Invalid input field animation */
@keyframes invalidField {
  0.0%{
    transform: rotate(0deg);
  }
  10.0%{
    transform: rotate(-3deg);
  }
  20.2%{
    transform: rotate(3deg);
  }
  30.1%{
    transform: rotate(-3deg);
  }
  40.3%{
    transform: rotate(3deg);
  }
  50.3%{
    transform: rotate(-3deg);
  }
  59.7%{
    transform: rotate(3deg);
  }
  70.3%{
    transform: rotate(-3deg);
  }
  80.1%{
    transform: rotate(3deg);
  }
  89.8%{
    transform: rotate(-3deg);
  }
  99.5%{
    transform: rotate(0deg);
  }
}
.input-container{
  flex-basis: calc(50% - 24px);
  min-width: 330px;
  fieldset{
    border-radius: 5px;
    border-color: $white-200;
    padding: 0;
    &:focus-within{
      border-color: $white-500;
    }
    legend{
      color: $white-500;
      font-family: "Roboto-Medium";
      font-size: 12px;
      line-height: 16px;
      padding: 0 8px;
      margin-left: 8px;
    }
    input {
      background-color: transparent;
      outline: none;
      border: none;
      width: 100%;
      height: 100%;
      padding: 9px 16px;
      color: $white-850;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
  p{
    color: $white-500;
    font-family: "Roboto-Regular";
    font-size: 12px;
    line-height: 16px;
    margin: 4px;
  }
}
@media only screen and (max-width: 768px) {
  .input-container{
    min-width: 0;
    width: calc(100% - 20px);
  }
}
</style>
