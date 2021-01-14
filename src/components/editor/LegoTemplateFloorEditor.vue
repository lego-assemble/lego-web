<template>
  <div>
    <el-form ref="form" :model="floor" label-width="80px">
      <el-form-item label="楼层名称">
        <el-input v-model="floor.name"></el-input>
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
    }
  },
  components: {
  },
  props: {
    floor: {
      type: Object,
      default: {},
      required: true
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleClose() {
      this.drawer = false
    },
    editFloorParam() {
      this.drawer = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
