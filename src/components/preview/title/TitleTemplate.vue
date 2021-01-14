<template>
  <div>
    <div id='demo' :style="{
      height: ((null == floor.param || null == floor.param.lineHeight) ? 20 : floor.param.lineHeight) + 'px',
      fontSize: ((null == floor.param || null == floor.param.fontSize) ? 20 : floor.param.fontSize) + 'px'
    }">
      {{(null == floor.param || null == floor.param.title) ? "" : floor.param.title}}
    </div>
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
  width: 100%;
}
</style>
