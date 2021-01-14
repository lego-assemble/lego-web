<template>
  <div>
    <van-card
    num="2"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
    />
  </div>
</template>

<script>
/* eslint-disable */
import BaseTemplate from '../base/BaseTemplate'
export default {
  extends: BaseTemplate,
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#demo {
  height: 100px;
  width: 100%;
  background-color: red;
}

#line {
  height: 1px;
  width: 100%;
  background-color: white;
}
</style>
