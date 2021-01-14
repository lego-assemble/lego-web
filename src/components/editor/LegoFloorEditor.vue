<template>
  <div>
    <el-form ref="form" :model="floor" label-width="80px">
      <el-form-item label="楼层名称">
        <el-input v-model="floor.name"></el-input>
      </el-form-item>

      <el-form-item label="引用名称">
        <el-input v-model="floor.refAlias"></el-input>
      </el-form-item>

      <el-form-item label="楼层类型" required>
        <el-select v-model="floor.type" placeholder="请选择" @change="changeFloorType">
          <el-option
            v-for="item in floorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="floor.type != null && floor.type != 'normal'" label="楼层接口" required>
        <lego-function-editor :funcData="floor.function">
        </lego-function-editor>
        <el-tag type="info">楼层动态参数为: '结果别名'.item</el-tag>
      </el-form-item>

      <component
        :is="floor.code + 'Editor'"
        :floor="floor"
      ></component>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'LegoFloorEditor',
  data () {
    return {
      paramEditor: "LegoParamEditor",
      drawer: false,
      direction: 'rtl',
      floorOptions: [
        {
          value: "normal",
          label: "普通"
        },
        {
          value: "list",
          label: "列表"
        },
        {
          value: "page",
          label: "分页"
        }
      ],
      floorFunction: {}
    }
  },
  components: {
  },
  props: {
    floor: {
      type: Object,
      default: {},
      required: true
    },
    activity: {
      type: Object,
      default: {},
      required: true
    }
  },
  created() {
    this.changeFloorType()
  },
  methods: {
    changeFloorType() {
      if ("normal" == this.floor.type) {
        return
      }

      if (null == this.floor.function) {
        this.floor.function = {}
        for (var key in this.floorFunction) {
          this.floor.function[key] = this.floorFunction[key]
        }
      } else {
        for (var key in this.floor.function) {
          this.floorFunction[key] = this.floor.function[key]
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
