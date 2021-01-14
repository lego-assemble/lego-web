<template>
  <div>
    <el-form ref="form" :model="activity" label-width="80px">
      <el-form-item label="Title">
        <el-input v-model="activity.name"></el-input>
      </el-form-item>

      <el-form-item label="绑定接口">
        <el-button size="mini" type="text" @click="appendFunction">新增</el-button>
        <div v-for="(func, idx) in activity.functions" :key="idx">
          <el-button size="mini" type="text" @click="removeFunction(func)">删除</el-button>
          <lego-function-editor :funcData="func">
          </lego-function-editor>
        </div>
      </el-form-item>

      <el-form-builder :config="schema" v-model="activity.param" label-width="80px">
      </el-form-builder>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import {safityValue, swapItems} from '../../../util/EasyUtils.js'
export default {
  data () {
    return {
      schema: {
        rules: {
        },
        elements: [
          {
            tag: 'el-switch',
            item: {
              label: '下拉刷新'
            },
            detail: {
              name: 'dropRefresh',
              defaultValue: safityValue(this.activity.param, "dropRefresh", true)
            }
          }
        ]
      }
    }
  },
  components: {
    
  },
  props: {
    activity: {
      type: Object,
      default: {},
      required: true
    }
  },
  created() {
  },
  methods: {
    appendFunction: function() {
      var func = {
        name: "",
        type: "instance",
        method: "GET",
        param: "",
        outputAlias: "",
        inputDemo: "",
        url: ""
      }

      if(null == this.activity.functions) {
        this.activity.functions = []
      }
      this.activity.functions.push(func)
    },
    removeFunction: function(func) {
      var that = this
      this.$confirm(`此操作将删除"${func.name}"接口, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var functions = this.activity.functions
          var index = functions.indexOf(func)
          functions.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '已取消删除'
        });          
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
