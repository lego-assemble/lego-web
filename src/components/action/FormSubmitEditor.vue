<template>
  <div v-if="null != currentParam">
    <el-form-item label="表单地址">
      <el-input v-model="param.url"></el-input>
    </el-form-item>
    <el-form-item label="表单参数">
      <el-input v-model="param.jumpParam"></el-input>
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
      currentParam: null
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
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  created() {
    if (null == this.param.url) {
      this.param.url = null
    }

    if (null == this.param.form) {
      this.param.form = ""
    }

    this.currentParam = this.param
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
