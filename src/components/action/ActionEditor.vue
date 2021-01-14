<template>
  <div>
    <el-form ref="form" :model="currentAction" label-width="80px">
      <el-form-item :label="title">
      </el-form-item>
      <el-form-item label="事件类型">
        <el-select v-model="currentAction.code" placeholder="请选择事件类型">
          <el-option v-for="(action, idx) in actions" :key="idx" :label="action.name" :value="action.code">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <component
    v-if="null != currentType"
    :is="currentType"
    :param="currentParam"></component>
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
      currentAction: {},
      currentType: null,
      currentParam: null
    }
  },
  props: {
    action: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  watch: {
    currentAction: {
      handler(val) {
        for (var key in this.currentAction) {
          this.action[key] = this.currentAction[key]
        }

        if (null != this.currentAction.code) {
          this.currentType = this.currentAction.code.charAt(0).toUpperCase() + this.currentAction.code.slice(1) + 'Editor'
        }
      },
      deep: true
    }
  },
  created() {2
    this.currentAction = this.action
    if (null == this.currentAction.param) {
      this.currentAction.param = {}
    }
    
    this.currentParam = this.currentAction.param
    this.loadActions()
  },
  methods: {
    loadActions: function() {
      if (this.isLoading) {
        return
      }

      this.isLoading = true
      var that = this
      var that = this
      GET("api/template/action/page", {
        page: 1,
        size: 200,
        keyword: ""
      }, function(content) {
        if (null != content.items) {
          that.actions = that.actions.concat(content.items)
        }
        
        that.isAllLoad = !content.hasMore
        that.isLoading = false
      }, function(error) {
        that.isLoading = false
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
