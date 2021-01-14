<template>
  <div class="DemoTemplate">
    <div id='demo' @click="doAction(floor.param.action)">{{floor.name}}</div>
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
  },
  methods: {
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

</style>
