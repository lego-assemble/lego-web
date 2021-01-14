<template>
  <div>
    <el-form-builder v-show="func != null" :config="functionSchema" v-model="func" label-width="80px">
     </el-form-builder>
  </div>
</template>

<script>
/* eslint-disable */
import {safityValue, swapItems, formatString, showMessage} from '../../util/EasyUtils.js'
export default {
  data () {
    return {
      func: null,
      functionSchema: {
        rules: {
          name: [{ required: true, message: '请输入接口名称' }],
          url: [{ required: true, message: '请输入接口地址(https/http)' }]
        },
        elements: [
          {
            tag: 'el-input',
            item: {
              label: '接口名称'
            },
            detail: {
              name: 'name',
              defaultValue: safityValue(this.funcData, "name", "")
            }
          },
          {
            tag: 'el-input',
            item: {
              label: '接口地址'
            },
            detail: {
              name: 'url',
              defaultValue: safityValue(this.funcData, "url", "https://")
            }
          },
          {
            tag: 'el-radio',
            item: {
              label: '调用方式'
            },
            detail: {
              name: 'method',
              items: [
                {
                    "text": "GET",
                    "label": "GET"
                }
              ],
              defaultValue: safityValue(this.funcData, "method", "GET")
            }
          },
          {
            tag: 'el-input',
            item: {
              label: '接口参数'
            },
            detail: {
              name: 'param',
              defaultValue: safityValue(this.funcData, "param", "")
            }
          },
          {
            tag: 'el-input',
            item: {
              label: '结果别名'
            },
            detail: {
              name: 'outputAlias',
              defaultValue: safityValue(this.funcData, "outputAlias", "funcRes")
            }
          }
        ]
      }
    }
  },
  watch: {
    func: {
      handler(val) {
        for (var key in this.func) {
          this.funcData[key] = this.func[key]
        }
      },
      deep: true
    }
  },
  components: {
    
  },
  props: {
    funcData: {
      type: Object,
      required: true
    }
  },
  created() {
      this.func = this.funcData
  },
  methods: {
    test() {
      console.log(this.funcData)
      console.log(this.func)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
