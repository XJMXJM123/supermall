<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll" :pull-up-load="true" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment ref="comment" :comment-info="commentInfo"></detail-comment>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :is-show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailComment from './childComps/DetailComment'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import Toast from 'components/common/toast/Toast'

  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'


  import Scroll from 'components/common/scroll/Scroll.vue'

  import { getDetail, getRecommend, Goods, Shop,GoodsParam } from 'network/detail'
  import { debounce } from 'common/utils';

  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailComment,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Scroll,
      Toast
    },
    data (){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0,
        isShowBackTop: false,
        show: false,
        message: ''
      }
    },
    created() {
      //1.???????????????iid
      this.iid = this.$route.params.iid

      //2.??????iid????????????
      getDetail(this.iid).then(res => {
        //??????????????????????????????
        const data = res.result
        this.topImages = data.itemInfo.topImages

        //??????????????????
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //???????????????????????????
        this.shop = new Shop(data.shopInfo)

        //????????????????????????
        this.detailInfo = data.detailInfo

        //??????????????????
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //??????????????????
        this.commentInfo = data.rate.list[0]

      }),
      //3.??????????????????
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getThemeTopYs = debounce(()=>{
        //?????????????????????offsetTop
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
      
    },
    mounted() {
      //1.??????item?????????????????????
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('datailItemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopYs()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position) {

        const positionY = -position.y
        let length = this.themeTopYs.length

        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //??????BackTop????????????
        this.isShowBackTop = (-position.y) > 1000
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      addToCart() {
        //1.?????????????????????????????????
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2.??????????????????????????????
        // this.$store.commit('addCart', product)
      //   this.$store.dispatch('addCart', product).then(res => {
      //      this.show = true;
      // this.message = res;
      // setTimeout(()=>{
      //   this.show = false
      //   this.message=''
      // },1500)
      //   })

        // this.addCart(product).then(res => {
        //   this.$toast.show(res, 1500)
        //   window.console.log(this.$toast.methods)
        // })

        this.addCart(product).then(res => {
          this.show = true;
          this.message = res;
          setTimeout(()=>{
          this.show = false
          this.message=''
          },1500)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
