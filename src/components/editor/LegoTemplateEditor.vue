<template>
  <div>
  <el-main>
      <div id="page_control" v-loading.fullscreen.lock="fullscreenLoading">
        <div id='page_control_lable'>模版管理</div>
        <el-button type="primary" id="page_control_button" @click="showUpsertTemplate">注册新模版</el-button>
      </div>
      <el-table v-loading="isLoading" :data="templates" v-infinite-scroll="loadTemplates" infinite-scroll-disabled="disabledLoadTemplates" style="overflow:auto">
        <el-table-column prop="name" label="模版名称" width="140">
        </el-table-column>
        <el-table-column prop="code" label="模版code" width="140">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTemplate(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="removeTemplate(scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" prop="gmtCreate" label="创建时间" width="250" :formatter="formatterTableDate">
        </el-table-column>
        <el-table-column fixed="right" prop="gmtModified" label="修改时间" :formatter="formatterTableDate">
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="模版信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="名称" label-width="60px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="code" label-width="60px">
          <el-select filterable v-model="form.code">
            <el-option
            v-for="item in registerTemplates"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleUpsertTemplate">取 消</el-button>
        <el-button type="primary" @click="submitUpsertTemplate">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
      title="编辑模版"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <component
        :is="floorEditor"
        :floor="selectedFloor"
      ></component>
    </el-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import {showMessage, allTemplates} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'

const templates = require.context('../../components/preview', true, /Template\.vue/);
const registerTemplateList = []
templates.keys().forEach(fileName => {
  const reqComNames = fileName.split('/')
  const reqComName = fileName.split('/')[reqComNames.length - 1]
  const realName = reqComName.split('.')[0]
  if (realName == 'BaseTemplate') {
    return
  }

  registerTemplateList.push(realName)
})

export default {
  data () {
      return {
        templates: [],
        searchInputKey: "",
        disabledLoadTemplates: false,
        currentPage: 1,
        isAllLoad: false,
        isLoading: false,
        form: {},
        dialogFormVisible: false,
        registerTemplates: registerTemplateList,
        drawer: false,
        direction: 'rtl',
        selectedFloor: null,
        floorEditor: "LegoTemplateFloorEditor",
        fullscreenLoading: false,
        isSaving: false
      }
  },
  props: {
  },
  created() {
    this.registerTemplates = registerTemplateList
  },
  methods: {
    reload(removeSearch) {
      this.disabledLoadTemplates = false
      this.templates = []
      this.currentPage = 1
      if (removeSearch) {
        this.searchInputKey = ""
      }

      this.dialogFormVisible = false
      this.isAllLoad = false
      this.loadTemplates()
    },
    searchTemplate: function() {
      this.reload(false)
    },
    loadTemplates: function() {
      if (this.isAllLoad) {
        return
      }

      if (this.isLoading) {
        return
      }

      this.isLoading = true
      var that = this

    this.fullscreenLoading = true
      var that = this
      GET("api/template/floor/page", {
        page: that.currentPage,
        size: 20,
        keyword: that.searchInputKey
      }, function(content) {
        that.currentPage = that.currentPage + 1
        if (null != content.items) {
          that.templates = that.templates.concat(content.items)
        }
        
        that.isAllLoad = !content.hasMore
        that.disabledLoadTemplates = that.isAllLoad
        that.isLoading = false
        that.fullscreenLoading = false
      }, function(error) {
        that.isLoading = false
        that.fullscreenLoading = false
      });
    },
    showUpsertTemplate: function() {
      this.dialogFormVisible = true
    },
    cancleUpsertTemplate: function() {
      this.dialogFormVisible = false
    },
    submitUpsertTemplate: function() {
      var that = this
      this.form.activityId = 0
      this.form.sortOrder = "0"
      this.form.type = "template"
      that.fullscreenLoading = true
      POST("api/template/floor/create", this.form, function(content) {
        if (content) {
          showMessage("保存成功", "info");
        } else {
          showMessage("保存失败", "error");
        }

        that.reload(true)
        that.fullscreenLoading = false
      }, function(e) {
        that.fullscreenLoading = false
      });
    },
    removeTemplate:function(floor) {
      var that = this
      this.$confirm(`此操作将删除"${floor.name}"模版, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.removeTemplateInner(floor)
        }).catch(() => {
          this.fullscreenLoading = false
          this.$message({
            type: 'error',
            message: '已取消删除'
        });          
      });
    },
    removeTemplateInner: function(floor) {
      if (this.isSaving) {
        return
      }
      var that = this
      this.fullscreenLoading = true
      this.isSaving = true
      POST("api/template/floor/remove", floor, function(content) {
        if (content) {
          showMessage("删除成功", "info");
        } else {
          showMessage("删除失败", "error");
        }

        that.fullscreenLoading = false
        that.isSaving = false
        that.reload(true)
      }, function(e) {
        that.fullscreenLoading = false
        that.isSaving = false
      });
    },
    toDate(time) {
      var d = new Date(time);
      var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
      return times
    },
    formatterTableDate(row, column, cellValue, index) {
      return this.toDate(cellValue)
    },
    editTemplate: function(floor){
      this.selectedFloor = floor
      this.drawer = true
    },
    previewTemplate: function(floor) {
      
    },
    querySearchTemplate() {
      console.log(this.$options.components)
    },
    handleClose(done) {
      if (this.isSaving || null == this.selectedFloor) {
        return
      }
      
      this.drawer = false
      this.isSaving = true
      var that = this
      that.fullscreenLoading = true
      POST("api/template/floor/save", this.selectedFloor, function(content) {
        if (content) {
          showMessage("保存成功", "info");
        } else {
          showMessage("保存失败", "error");
        }

        that.reload(true)
        that.fullscreenLoading = false
        that.drawer = false
        that.isSaving = false
      }, function(e) {
        that.fullscreenLoading = false
        that.drawer = false
        that.isSaving = false
      });
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
