<template>
  <div>
    <div id=bg v-if="showLayout">
      <component
      ref="editor"
      :is="layoutPreview"
      :layout="layout"
      ></component>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {showMessage} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'
export default {
  data () {
      return {
        layout: {},
        showLayout: false,
        layoutPreview: "BlankLayoutPreview"
      }
  },
  props: {
  },
  created() {
    this.createOrQueryLayout()
  },
  methods: {
    createOrQueryLayout: function() {
      var that = this
      var controllerId = this.$route.query.id
      GET("api/layout/query", {
        controllerId: controllerId
      }, function(content) {
        if (null == content) {
          // 创建布局信息
          showMessage("页面获取失败")
        } else {
          that.layout = content
          that.showLayout = true
          that.layoutPreview = that.layout.code + "Preview"
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bg {
  width: 100%;
  height: 100%;
}
</style>
