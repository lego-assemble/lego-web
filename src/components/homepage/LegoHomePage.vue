<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">我的应用</el-menu-item>
      <el-menu-item index="2">系统管理</el-menu-item>
      <el-menu-item index="3">事件管理</el-menu-item>
    </el-menu>

    <div class="line"></div>
    <div id="blank"></div>
    <div id="left">
      <component
      :is="selectPage"
      ></component>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
    	activeIndex: "1",
      selectPage: "LegoApplication",
      page: {
        1: "LegoApplication",
        2: "LegoTemplateEditor",
        3: "LegoActionEditor",
      }
    }
  },
  props: {
  },
  methods: {
    handleSelect: function(index, indexPath) {
      this.selectPage = this.page[index]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blank {
	height: 20px;
}

#left {
	float: left;
	width: 100%;
}
</style>
