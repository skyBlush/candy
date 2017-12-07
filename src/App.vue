<template>
  <div id="app">   
    <router-view/>
    <!-- <detail></detail> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  padding: 0;
  margin: 0;
}
body,html{
  height: 100%;
}
@font-face {
    font-family: 'iconfont';
    src: url('../font/iconfont.eot');
    src: url('../font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../font/iconfont.woff') format('woff'),
    url('../font/iconfont.ttf') format('truetype'),
    url('../font/iconfont.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
