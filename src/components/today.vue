<template>
  <div class="today">
    <LeftNav/>
    <div class="main-today">
      <div class="header-container">
        <p class="header">Today is a new day. Check your ratings!</p>
        <p class="sub-header">Graphs presents you rating results. Today you have 225 rates, check it on dashboard.</p>
      </div>
      <div class="image-container">
        <img class="img"
             id="bg-1"
             src="../assets/ovalcopy.svg"
             alt="background-one">
        <img class="img"
             id="bg-2"
             src="../assets/Oval.svg"
             alt="background-two">
        <img class="img"
             id="artwork"
             src="../assets/Artwork.svg"
             alt="artwork">
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
.main-today {
  width: calc(100% - 164px);
  .header-container{
    width: 35%;
    height: 40%;
    display: inline-block;
    margin: 0px 0px 0px 64px;
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
    width: calc(50% - 64px);
    height: 40%;
    display:inline-block;
    position: fixed;
    right: 64px;
    .img{
      height: 100%;
      width: 100%;
      inset: 0;
      position: absolute;
    }
    #bg-1{
      left: -60px;
    }
    #bg-2{
      left: -65px;
    }
  }
}
@media only screen and (max-width: 768px) {
  .main-today {
    height: calc(100% - 50px);
    margin-top: 60px;
    width: 100%;
    .header-container{
      margin: 0px 0px 0px 32px;
      .header{
        font-size: 32px;
        line-height: 30px;
      }
      .sub-header{
        font-size: 14px;
        line-height: 20px;
      }
    }
    .image-container {
      width: 50%;
      right: 0px;
      margin-right: 32px;
    }
  }
}

@media only screen and (max-width: 425px) {
  .main-today {
    padding: 0px 16px;
    .header-container {
      width: 100%;
      height: 20%;
      margin: 200px 0px 0px 0px;
    }

    .image-container {
      display: block;
      height: 20%;
      width: 100%;
      margin-right: 0px;
      top: 60px;
    }
  }
}
</style>
