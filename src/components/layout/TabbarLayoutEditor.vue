<template>
  <div>
    <el-row id='layout' v-if="showFloor">
      <el-col :span="10" id="shadow">

      <van-nav-bar :title="currentActivity.name" left-text="返回" left-arrow v-show="layout.param.navbarType != 3"></van-nav-bar>
      <div id="layout_editor" v-if="showFloor">
        <component
        :is="activityEditor"
        :activity="currentActivity"
        ></component>
      </div>

      <van-tabbar v-model="selectedTabbarIndex" style="position: inherit;" @change="changeTabbar">
          <van-tabbar-item v-for="tabbar in layout.param.tabbars" :key="tabbar.id" :icon="tabbar.icon">{{tabbar.name}}</van-tabbar-item>
      </van-tabbar>

    </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="10">
        <tabbar-layout-setting :layout="layout" :activity="currentActivity"></tabbar-layout-setting>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import BaseLayout from './BaseLayout'
import {showMessage} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'

export default {
  extends: BaseLayout,
  data () {
    return {
      currentActivity: {},
      activityEditor: "NormalActivityEditor",
      showFloor: false,
      selectedTabbarIndex: 0,
      tabbarActivity: {},
      isLoading: false
    }
  },
  props: {
  },
  created() {
    this.load();
  },
  methods: {
    load: function() {
      if (this.layout.param.tabbars == null || this.layout.param.tabbars.length == 0) {
      this.layout.param.tabbars = [
          {
            "name": "首页",
            "id": 0,
            "icon": "home-o"
          }
        ]
      }

      this.createOrQueryActivity()
    },
    createOrQueryActivity() {
      var that = this
      var layout = this.layout.param.tabbars[this.selectedTabbarIndex]
      var activity = this.tabbarActivity[layout.id]
      var activityId = layout.activityId
      if (null != activity) {
        this.currentActivity = activity
        this.showFloor = true
        that.$forceUpdate()
        return
      }
      
      if (null == activityId) {
        activity = {
          floors: [],
          functions: [],
          params: {},
          code: "",
          name: "默认"
        }
        
        this.tabbarActivity[layout.id] = activity
        this.currentActivity = activity
        this.showFloor = true
      } else {
        GET("api/activity/detail", {
          activityId: activityId
        }, function(content) {
          that.tabbarActivity[layout.id] = content
          if (content.floors == null) {
            content.floors = []
          }

          that.showFloor = true
          that.currentActivity = content
          that.$forceUpdate()
        });
      }
    },
    saveActivity() {
      var that = this
      this.layout.param.tabbars.forEach((item,index,array)=>{
        var activity = this.tabbarActivity[item.id]
        if (null == activity) {
          return
        }

        activity.layoutId = this.layout.id
        POST("api/activity/upsert", activity, function(content) {
          if (null == content || content <= 0) {
            showMessage("保存楼层失败", "error");
          } else {
            item.activityId = content
            that.saveLayout()
          }
        });
      })
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
    },
    changeTabbar: function() {
      this.createOrQueryActivity()
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

</style>
