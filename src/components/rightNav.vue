<template>
  <div class="dropdown">
    <div class="dropbtn">
      <img src="../assets/profile.png"
           alt="Profile">
      <div class="dropdown-content">
        <a>Pero Peric</a>
        <a href="#">Logout</a>
      </div>
    </div>
    <hr>
  </div>
</template>
<script>
export default {
  name: 'RightNav'
}
</script>
<style lang="scss">
.dropdown {
  background-color:#2C3039;
  width: 64px;
  height: 100%;
  position: absolute;
  right: 0;
  display: inline-block;
  text-align: center;
  .dropbtn {
    font-size: 16px;
    border: none;
    cursor: pointer;
    width: 64px;
    height: 64px;
    img {
      background-size: 100%;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      margin-top: 12px;
    }
    .dropdown-content {
      position: absolute;
      right: 0;
      min-width: 160px;
      background-color: #2C3039;
      z-index: 1;
      display: none;
    }
    a {
      font-family: Roboto-Medium;
      text-align: left;
      font-size: 15px;
      color: #FFF;
    }
    .dropdown-content a {
      text-decoration: none;
      padding: 12px 16px;
      display: block;
    }
  }
  hr {
    background-color: #FFFFFF;
    opacity: 0.5;
    height: 1px;
    border: 0;
  }
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content a:hover {
  opacity: 0.5;
}
</style>
