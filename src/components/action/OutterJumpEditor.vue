<template>
  <div v-if="null != currentParam">
    <el-form-item label="页面地址">
      <el-input v-model="currentParam.url"></el-input>
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
      currentAction: null,
      actionSchema: {},
      isLoading: false,
      actions: [],
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
    this.currentParam = this.param
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
