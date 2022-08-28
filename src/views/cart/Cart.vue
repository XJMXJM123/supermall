<template>
  <div class="cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>

    <!-- 商品列表 -->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true">
      <cart-list></cart-list>
    </scroll>

    <cart-bottom-bar class="bottom"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar';

import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}

</script>

<style scoped>

  #cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  
.content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
}
.bottom{
  position: fixed;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
