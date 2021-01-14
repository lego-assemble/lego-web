<template>
  <div>
    <van-nav-bar
    title="标题"
    left-arrow
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
