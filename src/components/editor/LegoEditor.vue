<template>
  <div class="hello" v-loading.fullscreen.lock="fullscreenLoading">
    <el-container style="height: 100%; top: 0px; border: 1px solid #eee;">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-button type="primary" @click="previewActivity" v-if="!isEnablePreview">预览</el-button>
          <el-button type="primary" @click="editActivity" v-if="isEnablePreview">编辑</el-button>
          <el-button type="primary" @click="saveActivity">保存</el-button>
        </el-header>

        <el-main>
          <div id="editor_area">
            <el-row>
              <el-col :span="1">
                <div id="splite">&nbsp;</div>
              </el-col>
              <el-col :span="6">
                <div id='template_area' v-infinite-scroll="loadTemplates" infinite-scroll-disabled="disabledLoadTemplate">
                  <div id='edit_floor_template' v-for="(floor, idx) in floorTemplates" :key="idx + '_' + floor.id">
                    <div id="shadow">
                      <div>
                        <div id="template_inline">{{floor.name}}</div>
                        <el-button id="template_title" type="text" @click="addTemplate(floor)">添加</el-button>
                      </div>
                      <component
                      :is="floor.code"
                      :floor="floor"
                      :activity="activity"
                      ></component>
                    </div>
                    <div id='line'></div>
                  </div>
                </div>
              </el-col>
              <el-col :span="1">
                <div id="splite">&nbsp;</div>
              </el-col>
              <el-col :span="16">
                <div v-if="showLayout">
                  <component
                  ref="editor"
                  :is="layoutEditor"
                  :layout="layout"
                  ></component>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-main>
      </el-container>
    </el-container>

    <el-drawer
    title="请选择页面布局"
    size="90%"
    :visible.sync="showCreateLayer"
    :direction="direction"
    :wrapperClosable="autoClose"
    :show-close="autoClose"
    :close-on-press-escape="autoClose">
    <el-row>
      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>空白布局</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="createLayout('BlankLayout')">使用</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="4">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>TabBar布局</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="createLayout('TabbarLayout')">使用</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </el-drawer>
  </div>
</template>
<script>
/* eslint-disable */
import {showMessage} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'

export default {
  name: 'LegoEditor',
  data () {
    return {
      activity: {},
      msg: 'Welcome to Your Vue.js App',
      layoutEditor: "BlankLayoutEditor",
      currentFloorTemplatePage: 1,
      isFloorTemplateAllLoad: false,
      floorTemplates: [],
      disabledLoadTemplate: false,
      isEnablePreview: false,
      layout: null,
      direction: "btt",
      showCreateLayer: false,
      autoClose: false,
      showLayout: false,
      fullscreenLoading: false
    }
  },
  components: {
  },
  created() {
    this.createOrQueryLayout()
  },
  methods: {
    createOrQueryLayout: function() {
      this.fullscreenLoading = true
      var that = this
      var controllerId = this.$route.query.id
      GET("api/layout/query", {
        controllerId: controllerId
      }, function(content) {
        if (null == content) {
          // 创建布局信息
          that.showCreateLayer = true
        } else {
          that.layout = content
          that.showLayout = true
          that.layoutEditor = that.layout.code + "Editor"
        }

        that.fullscreenLoading = false
      })
    },
    loadTemplates: function() {
      if (this.isFloorTemplateAllLoad) {
        return
      }

      var that = this
      GET("api/template/floor/page", {
        page: that.currentFloorTemplatePage,
        size: 20,
        keyword: ''
      }, function(content) {
        that.currentFloorTemplatePage = that.currentFloorTemplatePage + 1
        that.floorTemplates = that.floorTemplates.concat(content.items)
        that.isFloorTemplateAllLoad = !content.hasMore
        that.disabledLoadTemplate = that.isFloorTemplateAllLoad
      });
    },
    addTemplate: function(floor) {
      this.$refs.editor.addTemplate(floor)
    },
    previewActivity() {
      this.isEnablePreview = true
      this.$refs.editor.changeEditorType(true)
    },
    editActivity() {
      this.isEnablePreview = false
      this.$refs.editor.changeEditorType(false)
    },
    saveActivity() {
      this.$refs.editor.saveActivity()
    },
    createLayout(type) {
      var controllerId = this.$route.query.id
      var that = this
      POST("api/layout/create", {
        name: "blank",
        param: {},
        code: type,
        controllerId: controllerId
      }, function(content) {
        if (content) {
          showMessage("保存成功", "info");
          that.showCreateLayer = false
          that.createOrQueryLayout()
        } else {
          showMessage("保存失败", "error");
        }
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

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

#editor_area {
  width: 100%;
}

#template_area {
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
}

#template_inline {
  display: inline;
}

#edit_floor_template {
  height: auto;
  width: 100%;
}

#line {
  height: 40px;
  width: 100%;
  background-color: white;
}

#splite {
  height: 100%;
  background-color: white;
}

#shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
