<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
#app,
body,
html {
  height: 100%;
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: auto;
}
@font-face {
  font-family: "iconfont"; /* project id 633729 */
  src: url("//at.alicdn.com/t/font_633729_i3mflcfj8knjyvi.eot");
  src: url("//at.alicdn.com/t/font_633729_i3mflcfj8knjyvi.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_633729_i3mflcfj8knjyvi.woff") format("woff"),
    url("//at.alicdn.com/t/font_633729_i3mflcfj8knjyvi.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_633729_i3mflcfj8knjyvi.svg#iconfont")
      format("svg");
}
.iconfont {
  font-family: "iconfont";
  font-style: normal;
}
</style>
