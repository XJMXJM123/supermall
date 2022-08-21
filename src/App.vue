<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    
    <main-tab-bar v-if="!/^\/detail/.test($route.path)"></main-tab-bar>  <!-- 详情页不显示(此处为正则判断) -->
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
