<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <span>测试</span>
    </el-header>

  <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu @select="selectPage" default-active="1">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">页面管理</span>
      </el-menu-item>
    </el-menu>
  </el-aside>

  <el-container>
    <component :is="currentPage"></component>
  </el-container>
  </el-container>
  </div>
</template>

<script>
/* eslint-disable */
import {showMessage} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'
export default {
  data () {
      return {
        page: {
          1: "LegoControllerEditor",
          2: "LegoTemplateEditor",
        },
        currentPage: "LegoControllerEditor",
        fullscreenLoading: true
      }
  },
  props: {
  },
  methods: {
    selectPage(index, indexPath) {
      this.currentPage = this.page[index]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

#page_control {
  width: 100px;
}

#page_control_lable {
  width: 90px;
  height: 40px;
  font-size: 22px;
}

#page_control_button {
  font-size: 14px;
}

</style>
