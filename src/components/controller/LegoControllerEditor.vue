<template>
  <div>
  <el-main>
      <div id="page_control">
        <div id='page_control_lable'>页面管理</div>
        <el-button type="primary" id="page_control_button" @click="showUpsertController">新增页面</el-button>
      </div>
      <el-table v-loading="isLoading" :data="controllers" v-infinite-scroll="loadControllers" infinite-scroll-disabled="disabledLoadControllers" style="overflow:auto">
        <el-table-column prop="name" label="页面名称" width="140">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="previewController(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="editController(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="removeController(scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" prop="gmtCreate" label="创建时间" width="250" :formatter="formatterTableDate">
        </el-table-column>
        <el-table-column fixed="right" prop="gmtModified" label="修改时间" :formatter="formatterTableDate">
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog title="页面信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="名称" label-width="60px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleUpsertController">取 消</el-button>
        <el-button type="primary" @click="submitUpsertController">确 定</el-button>
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
        controllers: [],
        searchInputKey: "",
        disabledLoadControllers: false,
        currentPage: 1,
        isAllLoad: false,
        isLoading: false,
        form: {},
        dialogFormVisible: false
      }
  },
  props: {
  },
  methods: {
    reload(removeSearch) {
      this.disabledLoadControllers = false
      this.controllers = []
      this.currentPage = 1
      if (removeSearch) {
        this.searchInputKey = ""
      }

      this.dialogFormVisible = false
      this.isAllLoad = false
      this.loadControllers()
    },
    searchController: function() {
      this.reload(false)
    },
    loadControllers: function() {
      if (this.isAllLoad) {
        return
      }

      if (this.isLoading) {
        return
      }

      this.isLoading = true
      var that = this
      var appId = this.$route.query.id
      GET("api/controller/page", {
        page: that.currentPage,
        size: 20,
        keyword: that.searchInputKey,
        appId: appId
      }, function(content) {
        that.currentPage = that.currentPage + 1
        if (null != content.items) {
          that.controllers = that.controllers.concat(content.items)
        }
        
        that.isAllLoad = !content.hasMore
        that.disabledLoadControllers = that.isAllLoad
        that.isLoading = false
      }, function(error) {
        that.isLoading = false
      });
    },
    showUpsertController: function() {
      this.dialogFormVisible = true
    },
    cancleUpsertController: function() {
      this.dialogFormVisible = false
    },
    submitUpsertController: function() {
      var that = this
      this.form.applicationId = this.$route.query.id
      this.form.type = "instance"
      POST("api/controller/create", this.form, function(content) {
        if (content) {
          showMessage("保存成功", "info");
        } else {
          showMessage("保存失败", "error");
        }

        that.reload(true)
      });
    },
    removeController: function(controller) {
      var that = this
      POST("api/controller/remove", controller, function(content) {
        if (content) {
          showMessage("删除成功", "info");
        } else {
          showMessage("删除失败", "error");
        }

        that.reload(true)
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
    editController: function(controller){
      window.location.href = "/edit?id=" + controller.id;
    },
    previewController: function(controller) {
      window.open("/view?id=" + controller.id)
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
