<template>
  <div class="today">
    <LeftNav/>
    <div class="main">
      <div class="header-container">
        <p class="header">Today is a new day. Check your ratings!</p>
        <p class="sub-header">Graphs presents you rating results. Today you have 225 rates, check it on dashboard.</p>
      </div>
      <div class="image-container">
        <img class="img" id="bg-1" src="../assets/ovalcopy.svg" alt="">
        <img class="img" id="bg-2" src="../assets/Oval.svg" alt="">
        <img class="img" id="artwork" src="../assets/Artwork.svg" alt="">
      </div>
    </div>
    <RightNav/>
  </div>
</template>
<script>
import LeftNav from '../components/leftNav'
import RightNav from '../components/rightNav'
export default {
  name: 'Today',
  components: {
    LeftNav,
    RightNav
  }
}
</script>
<style lang="scss">
.today {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.main {
  width: calc(100% - 164px);
  .header-container{
    width: 35%;
    height: 40%;
    display: inline-block;
    margin: 0px 0px 0px 64px;
    position: relative;
    .header{
      color: rgba(255, 255, 255, 0.6);
      font-family: Roboto-Black;
      font-size: 48px;
      line-height: 58px;
      text-align: left;
    }
    .sub-header{
      color: rgba(255, 255, 255, 0.6);
      font-family: Roboto-Regular;
      font-size: 18px;
      line-height: 26px;
      text-align: left;
      border: 0;
    }
  }
  .image-container {
    width: calc(60% - 64px);
    height: 40%;
    display:inline-block;
    position: absolute;
    .img{
      position: absolute;
      height: 100%;
      width: 100%;
      inset: 0;
    }
    #bg-1{
      z-index: 3;
      left: -60px;
    }
    #bg-2{
      z-index: 4;
      left: -65px;
    }
  }
}
</style>
