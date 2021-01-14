<template>
  <div>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
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
