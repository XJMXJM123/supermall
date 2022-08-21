<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
      <li>lb1</li>
      <li>lb2</li>
      <li>lb3</li>
      <li>lb4</li>
      <li>lb5</li>
      <li>lb6</li>
      <li>lb7</li>
      <li>lb8</li>
      <li>lb9</li>
    </ul>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted(){
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad: true
      })

      this.scroll.on('scroll',(position) => {
        window.console.log(position)
      })

      this.scroll.on('pullingUp',() => {
         window.console.log('sljzgd')
      })
    }

  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;
  }
</style>
