<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keeepalive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keeepalive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style land="less">
  body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #f4f4f4 ;
  }
  p{
    margin: 0;
    padding: 0;
  }
</style>
