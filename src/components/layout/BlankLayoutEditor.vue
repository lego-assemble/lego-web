<template>
  <div>
      <el-row id='layout' v-if="showFloor">
      <el-col :span="10" id="shadow">
        <van-nav-bar :title="currentActivity.name" left-text="返回" left-arrow v-show="layout.param.navbarType != 3"></van-nav-bar>
        <div id="layout_editor">
          <component
          :is="activityEditor"
          :activity="currentActivity"
          ></component>
        </div>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="9">
        <blank-layout-setting :layout="layout" :activity="currentActivity"></blank-layout-setting>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import BaseLayoutEditor from './BaseLayoutEditor'
import {showMessage} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'

export default {
  extends: BaseLayoutEditor,
  data () {
    return {
      currentActivity: {},
      showFloor: false
    }
  },
  props: {
  },
  created() {
    this.createOrQueryActivity()
  },
  methods: {
    createOrQueryActivity() {
      var that = this
      var activityId = this.layout.param.activityId

      if (null == activityId) {
        this.currentActivity = {
          floors: [],
          functions: [],
          params: {},
          code: "",
          name: "默认"
        }
        
        this.showFloor = true
      } else {
        GET("api/activity/detail", {
          activityId: activityId
        }, function(content) {
          that.currentActivity = content
          if (content.floors == null) {
            content.floors = []
          }

          that.showFloor = true
        });
      }
    },
    saveActivity() {
      var that = this
      this.currentActivity.layoutId = this.layout.id
      POST("api/activity/upsert", this.currentActivity, function(content) {
        if (null == content || content <= 0) {
          showMessage("保存楼层失败", "error");
        } else {
          that.layout.param.activityId = content
          that.saveLayout()
        }
      });
    },
    saveLayout() {
      POST("api/layout/save", this.layout, function(content) {
        if (content) {
          showMessage("保存成功", "info");
        } else {
          showMessage("保存布局失败", "error");
        }
      });
    },
    addTemplate: function(floor) {
      // copy new floor
      var objString = JSON.stringify(floor);
      var obj2 = JSON.parse(objString);
      this.currentActivity.floors.push(obj2)
    },
    changeEditorType(preview) {
      if (preview) {
        this.activityEditor = "NormalActivityPreview"
      } else {
        this.activityEditor = "NormalActivityEditor"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layout_editor {
  width: 100%;
  min-height: 600px;
}

#shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#layout {
  width: 100%;
  height: 100%;
}
</style>
