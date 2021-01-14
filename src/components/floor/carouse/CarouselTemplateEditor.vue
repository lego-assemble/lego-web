<template>
  <div>
    <action-editor title="点击事件" :action="floor.param.action"></action-editor>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    floor: {
      type: Object,
      required: true
    }
  },
  created() {
    if (null == this.floor.param) {
      this.floor.param = {}
    }

    if (null == this.floor.param.action) {
      this.floor.param.action = {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#demo {
  height: 20px;
  width: 100%;
}
</style>
