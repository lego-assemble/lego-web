<template>
  <div>
  <el-main>
      <div id="page_control" v-loading.fullscreen.lock="fullscreenLoading">
        <div id='page_control_lable'>事件管理</div>
        <el-button type="primary" id="page_control_button" @click="showUpsertAction">注册事件</el-button>
      </div>
      <el-table v-loading="isLoading" :data="actions" v-infinite-scroll="loadActions" infinite-scroll-disabled="disabledLoadActions" style="overflow:auto">
        <el-table-column prop="name" label="事件名称" width="140">
        </el-table-column>
        <el-table-column prop="code" label="事件code" width="140">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editAction(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="removeAction(scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" prop="gmtCreate" label="创建时间" width="250" :formatter="formatterTableDate">
        </el-table-column>
        <el-table-column fixed="right" prop="gmtModified" label="修改时间" :formatter="formatterTableDate">
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="事件信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="事件名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件code" label-width="120px">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleUpsertAction">取 消</el-button>
        <el-button type="primary" @click="submitUpsertAction">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import {showMessage} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'

export default {
  data () {
      return {
        actions: [],
        searchInputKey: "",
        disabledLoadActions: false,
        currentPage: 1,
        isAllLoad: false,
        isLoading: false,
        form: {},
        dialogFormVisible: false,
        fullscreenLoading: false,
        isSaving: false
      }
  },
  props: {
  },
  created() {
  },
  methods: {
    reload(removeSearch) {
      this.disabledLoadActions = false
      this.actions = []
      this.currentPage = 1
      if (removeSearch) {
        this.searchInputKey = ""
      }

      this.dialogFormVisible = false
      this.isAllLoad = false
      this.form = {}
      this.loadActions()
    },
    searchAction: function() {
      this.reload(false)
    },
    loadActions: function() {
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
      GET("api/template/action/page", {
        page: that.currentPage,
        size: 20,
        keyword: that.searchInputKey
      }, function(content) {
        that.currentPage = that.currentPage + 1
        if (null != content.items) {
          that.actions = that.actions.concat(content.items)
        }
        
        that.isAllLoad = !content.hasMore
        that.disabledLoadActions = that.isAllLoad
        that.isLoading = false
        that.fullscreenLoading = false
      }, function(error) {
        that.isLoading = false
        that.fullscreenLoading = false
      });
    },
    showUpsertAction: function() {
      this.dialogFormVisible = true
    },
    cancleUpsertAction: function() {
      this.form = {}
      this.dialogFormVisible = false
    },
    submitUpsertAction: function() {
      var that = this
      this.form.type = "template"
      that.fullscreenLoading = true
      var api = "api/template/action/create"
      if (this.form.id != null) {
        api = "api/template/action/save"
      }

      POST(api, this.form, function(content) {
        if (content) {
          showMessage("保存成功", "info");
        } else {
          showMessage("保存失败", "error");
        }

        that.reload(true)
        that.fullscreenLoading = false
        that.form = {}
      }, function(e) {
        that.fullscreenLoading = false
      });
    },
    removeAction:function(floor) {
      var that = this
      this.$confirm(`此操作将删除"${floor.name}"模版, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.removeActionInner(floor)
        }).catch(() => {
          this.fullscreenLoading = false
          this.$message({
            type: 'error',
            message: '已取消删除'
        });          
      });
    },
    removeActionInner: function(floor) {
      if (this.isSaving) {
        return
      }
      var that = this
      this.fullscreenLoading = true
      this.isSaving = true
      POST("api/template/action/remove", floor, function(content) {
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
    querySearchAction() {
      console.log(this.$options.components)
    },
    editAction(action) {
      this.form = action
      this.dialogFormVisible = true
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
