<template>
  <div>
    <el-form :inline="true" label-width="80px">
      <el-form-item label="应用名">
        <el-input v-model="searchInputKey" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchApplication">搜索</el-button>
      </el-form-item>
    </el-form>

    <div id="appContainer" v-infinite-scroll="loadApplications" infinite-scroll-disabled="disabledLoadApplications" style="overflow:auto">
      <div id="appItem" @click="showUpsertApplication">
        <el-card class="box-card">
          <div id="cycle">+</div>
        </el-card>
      </div>

      <div id="appItem" v-for="application in applications" :key="application.id">
        <el-card class="box-card">
          <div>{{application.name}}</div>
          <el-button type="text" @click="editController(application)">查看</el-button>
          <el-button type="text" @click="editController(application)">编辑</el-button>
          <el-button type="text" @click="removeApplication(application)">删除</el-button>
        </el-card>
      </div>
    </div>

    <el-dialog title="应用信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="名称" label-width="60px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleUpsertApplication">取 消</el-button>
        <el-button type="primary" @click="submitUpsertApplication">确 定</el-button>
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
    	activeIndex: "1",
      searchInputKey: "",
      disabledLoadApplications: false,
      applications: [],
      currentPage: 1,
      isAllLoad: false,
      dialogFormVisible: false,
      form: {},
      isLoading: false
    }
  },
  props: {
  },
  methods: {
    reload(removeSearch) {
      this.disabledLoadApplications = false
      this.applications = []
      this.currentPage = 1
      if (removeSearch) {
        this.searchInputKey = ""
      }

      this.isAllLoad = false
      this.dialogFormVisible = false
      this.loadApplications()
    },
    searchApplication: function() {
      this.reload(false)
    },
    loadApplications: function() {
      if (this.isAllLoad) {
        return
      }

      if (this.isLoading) {
        return
      }

      this.isLoading = true
      var that = this
      GET("api/application/page", {
        page: that.currentPage,
        size: 20,
        keyword: that.searchInputKey
      }, function(content) {
        that.currentPage = that.currentPage + 1
        if (null != content.items) {
          that.applications = that.applications.concat(content.items)
        }
        
        that.isAllLoad = !content.hasMore
        that.disabledLoadApplications = that.isAllLoad
        that.isLoading = false
      }, function(error) {
        that.isLoading = false
      });
    },
    showUpsertApplication: function() {
      this.dialogFormVisible = true
    },
    cancleUpsertApplication: function() {
      this.dialogFormVisible = false
    },
    submitUpsertApplication: function() {
      var that = this
      POST("api/application/create", this.form, function(content) {
        if (content) {
          showMessage("保存成功", "info");
        } else {
          showMessage("保存失败", "error");
        }

        that.reload(true)
      });
    },
    removeApplication: function(application) {
      var that = this
      this.$confirm(`此操作将删除"${application.name}"应用, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.removeApplicationInner(application)
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '已取消删除'
        });          
      });

      
    },
    removeApplicationInner(application) {
      var that = this
      POST("api/application/remove", application, function(content) {
        if (content) {
          showMessage("删除成功", "info");
        } else {
          showMessage("删除失败", "error");
        }

        that.reload(true)
      });
    },
    editController: function(application) {
      window.location.href = "/app?id=" + application.id;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  width: 180px;
  height: 100px;
}

#appItem {
  display: inline;
  float: left;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
}

#appContainer {
  width: 100%;
  display: inline;
  /*float: left;*/
  margin-left: 80px;
}

#cycle {
  font-size: 50px;
}
</style>
