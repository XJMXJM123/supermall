<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button
      class="check-button"
      :is-checked="isSelectAll"
      @click.native="checkclick"></check-button>
    <span>全选</span>
  </div>
    <div class="count">
      合计¥:{{totalprice}}
    </div>
    <div class="calc">去计算:({{checklength}})</div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data(){
    return{
    check: false
    }
  },
  methods: {
    checkclick(){
      if (this.isSelectAll){
        this.$store.getters.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.getters.cartList.forEach(item => item.checked = true)
      }
    //   this.$toast.methods.isShow
    }
  },
  computed: {
    ...mapGetters(['cartLength']),
   totalprice(){
    //   return   this.$store.getters.cartList.filter(item=> item.isChecked
    //   ).reduce((previousValue,item)=>{
    //     return previousValue + item.count * item.price
    //   },0)
        return this.$store.state.cartList.filter(item => {
            return item.checked
        }).reduce((preValue, item) => {
            return preValue + item.price * item.count
        }, 0).toFixed(2)
   },
    checklength(){
    //   return this.$store.state.cartList.filter(item => item.isChecked).reduce((previousValue,item)=>{
    //     return previousValue + item.count
    //   },0)
        return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if (this.cartLength === 0) {
        return false
      }else {
        return !(this.$store.state.cartList.filter(item => !item.checked).length)
        }
    }
  },
 }
</script>

<style scoped>
.bottom-bar{
  background-color: #eee;
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.check-button{
  width: 20px;
  height: 20px;
   line-height: 20px;
  margin-right: 10px;
}
.check-content{
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-left: 10px;
  width: 60px;
}
.count{
  color: #ff5777;
  padding-left: 50px;
  flex: 1;
  font-size: 13px;
}
.calc{
 width: 90px;
  color: white;
  text-align: center;
  background-color: #ff8198;
  font-size: 14px;
}
</style>