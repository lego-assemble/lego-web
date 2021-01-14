<template>
  <div>
    <base-layout-setting :layout="layout" :activity="activity"></base-layout-setting>
    <el-form ref="form" :model="layout" label-width="80px">
      <el-form-item label="底部">
      </el-form-item>

      <el-table
          :data="layout.param.tabbars"
          style="margin-left: 120px">
          <el-table-column
            label="名称"
            prop="name"
            width="80">
          </el-table-column>
          <el-table-column
            label="icon"
            prop="icon"
            width="80">
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <el-button size="mini" @click="showCreateTabbar">新增</el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="upTabbar(scope.row)">上移</el-button>

              <el-button
                size="mini"
                type="text"
                @click="downTabbar(scope.row)">下移</el-button>

              <el-button
                size="mini"
                type="text"
                @click="removeTabbar(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="createTabbarVisible"
      width="30%">

      <el-form :model="form">
          <el-form-item label="标题" label-width="80">
            <el-input v-model="form.name" autocomplete="off" style="width:180px;"></el-input>
          </el-form-item>
          <el-form-item label="图标" label-width="80">
            <el-select v-model="form.icon" placeholder="请选择图标" style="width:180px;">
              <el-option value='chat'><van-icon name="chat" /></el-option>
              <el-option value='home-o'><van-icon name="home-o" /></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelTabbar">取 消</el-button>
          <el-button type="primary" @click="doCreateTabbar">确 定</el-button>
        </div>

    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
import BaseLayoutSetting from './BaseLayoutSetting'
import {swapItems} from '../../util/EasyUtils.js'
export default {
  extends: BaseLayoutSetting,
  name: 'LegoActivitySettingEditor',
  data () {
    return {
      createTabbarVisible: false,
      form: {},
      isUpdateTabbar: false
    }
  },
  components: {
    
  },
  props: {
    layout: {
      type: Object,
      default: {},
      required: true
    }
  },
  methods: {
    handleEdit(index, row) {
        this.form = row
        this.isUpdateTabbar = true
        this.createTabbarVisible = true
    },
    upTabbar(row) {
      var tabbars = this.layout.param.tabbars
      var index = tabbars.indexOf(row)
      if (index == 0) {
        return
      }

      swapItems(tabbars, index, index - 1)
    },
    downTabbar(row) {
      var tabbars = this.layout.param.tabbars
      var index = tabbars.indexOf(row)
      if (index == tabbars.length - 1) {
        return
      }

      swapItems(tabbars, index, index + 1)
    },
    removeTabbar(row) {
      var that = this
      this.$confirm(`此操作将删除"${row.name}"页面, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var tabbars = this.layout.param.tabbars
          var index = tabbars.indexOf(row)
          tabbars.splice(index, 1)
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
    },
    showCreateTabbar: function() {
      this.createTabbarVisible = true
    },
    cancelTabbar: function() {
      this.createTabbarVisible = false
    },
    doCreateTabbar: function () {
      if (null == this.layout.param.tabbars) {
        this.layout.param.tabbars = []
      }

      if (!this.isUpdateTabbar) {
        this.form.id = this.generateTabbarId()
        this.layout.param.tabbars.push(this.form)
      }
      
      this.form = {}
      this.createTabbarVisible = false
      this.isUpdateTabbar = false
    },
    generateTabbarId: function() {
      var maxId = 0
      this.layout.param.tabbars.forEach((item,index,array)=>{
        if (maxId < item.id) {
          maxId = item.id
        }
      })

      return maxId + 1
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
