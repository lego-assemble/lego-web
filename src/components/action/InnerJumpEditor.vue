<template>
  <div v-if="null != currentParam">
    <el-form-item label="跳转页面">
      <el-select v-model="currentParam.pageId" placeholder="请选择跳转页面">
          <el-option v-for="(controller, idx) in controllers" :key="idx" :label="controller.name" :value="controller.id">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="跳转参数">
      <el-input v-model="currentParam.jumpParam"></el-input>
    </el-form-item>
  </div>
</template>

<script>
/* eslint-disable */
import {get as GET, post as POST} from '../../util/HttpRequest.js'
export default {
  data () {
    return {
      isLoading: false,
      controllers: [],
      currentParam: {}
    }
  },
  props: {
    param: {
      type: Object,
      required: true
    }
  },
  watch: {
    currentParam: {
      handler(val) {
        for (var key in this.currentParam) {
          this.param[key] = this.currentParam[key]
        }
      },
      deep: true
    }
  },
  created() {
    if (this.isLoading) {
      return
    }

    var controllerId = this.$route.query.id
    if (null == controllerId) {
      return
    }
    
    this.isLoading = true
    var that = this
    GET("api/controller/list", {
      controllerId: controllerId
    }, function(content) {
      if (null != content) {
        that.controllers = that.controllers.concat(content)
      }
      
      that.currentParam = that.param
      that.isLoading = false
    }, function(error) {
      that.isLoading = false
    });
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
