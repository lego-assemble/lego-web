<template>
  <div>
    <el-form ref="form" :model="layout" label-width="80px">
      <el-form-item label="导航栏">
        <el-radio v-model="layout.param.navbarType" label="1">自动</el-radio>
      <el-radio v-model="layout.param.navbarType" label="2">常驻</el-radio>
      <el-radio v-model="layout.param.navbarType" label="3">无</el-radio>
      </el-form-item>
    </el-form>

    <component
          :is="activitySetting"
          :activity="activity"
    ></component>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      activitySetting: "NormalActivitySetting"
    }
  },
  components: {
  },
  props: {
    layout: {
      type: Object,
      required: true
    },
    activity: {
      type: Object,
      required: true
    }
  },
  methods: {
    
  },
  created() {
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
