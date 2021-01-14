<template>
  <div>
    <div id="floor_preview" v-for="floor in activity.floors" :key="floor.id">
      <div>{{floor.name}}</div>
      <el-button type="text" @click="editFloor(floor)">编辑</el-button>
      <el-button type="text" @click="upFloor(floor)">上移</el-button>
      <el-button type="text" @click="downFloor(floor)">下移</el-button>
      <el-button type="text" @click="removeFloor(floor)">删除</el-button>
      <div>
        <component
        :is="floor.code"
        :floor="floor"
        :activity="activity"
        ></component>
      </div>
    </div>

    <el-drawer
      v-if="showDrawer"
      title="编辑楼层"
      size="30%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <div id="floor_editor">
        <component
        :is="floorEditor"
        :floor="selectedFloor"
        :activity="activity"
        ></component>
      </div>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import {swapItems} from '../../../util/EasyUtils.js'

export default {
  name: 'LegoActivityEditor',
  data () {
    return {
      showDrawer: false,
      drawer: false,
      direction: 'rtl',
      selectedFloor: {},
      floorEditor: "LegoFloorEditor"
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
  methods: {
    handleClose: function() {
      this.drawer = false
      this.showDrawer = false
    },
    editFloor: function(floor) {
      this.showDrawer = true
      this.drawer = true
      this.selectedFloor = floor
    },
    upFloor(floor) {
      var floors = this.activity.floors
      var index = floors.indexOf(floor)
      if (index == 0) {
        return
      }

      swapItems(floors, index, index - 1)
    },
    downFloor(floor) {
      var floors = this.activity.floors
      var index = floors.indexOf(floor)
      if (index == floors.length - 1) {
        return
      }

      swapItems(floors, index, index + 1)
    },
    removeFloor(floor) {
      var that = this
      this.$confirm(`此操作将删除"${floor.name}"楼层, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var floors = that.activity.floors
          var index = floors.indexOf(floor)
          floors.splice(index, 1)
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

#floor_preview {
  margin-top: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#line {
  height: 100px;
  width: 100%;
  background-color: white;
}

#floor_editor {
  position: absolute;
  overflow: scroll;
  height: 90%;
  width: 100%;
}

</style>
