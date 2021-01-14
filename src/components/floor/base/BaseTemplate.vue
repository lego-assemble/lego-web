<template>
  <div>
  </div>
</template>

<script>
/* eslint-disable */
import {formatMap} from '../../../util/EasyUtils.js'
export default {
  data () {
    return {
    }
  },
  props: {
    floor: {
      type: Object,
      required: true
    },
    context: {
      type: Object,
      required: false
    }
  },
  created() {
    if (this.floor.param == null) {
      this.floor.param = {}
    }
  },
  methods: {
    doAction(action) {
      if(null == action) {
        return
      }

      var copyedAction = JSON.parse(JSON.stringify(action))
      formatMap(copyedAction, this.context)
      console.log(copyedAction)
      switch (copyedAction.code) {
        case "outterJump" : {
          window.location.href = copyedAction.param.url + "?" + copyedAction.param.jumpParam
          break
        }
        case "innerJump" : {
          window.location.href = "/view?id=" + copyedAction.param.pageId + "&" + copyedAction.param.jumpParam
          break
        }
        case "formSubmit" : {
          break
        }
        default: {
          console.log(copyedAction)
          break
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
