<template>
  <div>
    <el-form-builder :config="schema" v-model="floor.param" label-width="80px">
    </el-form-builder>
  </div>
</template>

<script>
/* eslint-disable */
import {safityValue} from '../../../util/EasyUtils.js'
export default {
  data () {
    return {
      schema: {
        rules: {
          title: [{ required: true, message: '请输入标题' }]
        },
        elements: [
          {
            tag: 'el-input',
            item: {
              label: '标题'
            },
            detail: {
              name: 'title',
              defaultValue: safityValue(this.floor.param, "title", "")
            }
          },
          {
            tag: 'el-input-number',
            item: {
              label: '文字大小(px)'
            },
            detail: {
              name: 'fontSize',
              defaultValue: safityValue(this.floor.param, "fontSize", "12")
            }
          },{
            tag: 'el-input-number',
            item: {
              label: '行高(px)'
            },
            detail: {
              name: 'lineHeight',
              defaultValue: safityValue(this.floor.param, "lineHeight", "20")
            }
          }
        ]
      }
    }
  },
  props: {
    floor: {
      type: Object,
      required: true
    }
  },
  created() {
    if (this.floor.param != null) {
      this.floor.param = {}
    }
  },
  methods: {
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
