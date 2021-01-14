<template>
  <div id="layout_editor">
    <van-nav-bar :title="currentActivity.name" @click-left="goBack" left-text="返回" fixed v-if="showFloor && canGoback" left-arrow v-show="showNavbar"></van-nav-bar>
    <van-nav-bar :title="currentActivity.name" fixed v-if="showFloor && !canGoback" v-show="showNavbar"></van-nav-bar>
    <div v-if="showNavbar" id="navbar_blank"></div>
    <!-- <div v-if="showFloor">
      <component
      :is="activityEditor"
      :activity="currentActivity"
      ></component>
    </div> -->
    <div v-for="(tabbar, idx) in layout.param.tabbars" :key="tabbar.id">
      <component
      v-show="selectedTabbarIndex == idx"
      v-if="null != tabbarActivity[tabbar.id]"
      :is="activityEditor"
      :activity="tabbarActivity[tabbar.id]"
      ></component>
    </div>
    <div id="tabbar_blank"></div>
    <van-tabbar v-model="selectedTabbarIndex" style="position: fixed;" @change="changeTabbar">
      <van-tabbar-item v-for="tabbar in layout.param.tabbars" :key="tabbar.id" :icon="tabbar.icon">{{tabbar.name}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
/* eslint-disable */
import BaseLayout from '../layout/BaseLayout'
import {showMessage} from '../../util/EasyUtils.js'
import {get as GET, post as POST} from '../../util/HttpRequest.js'

export default {
  extends: BaseLayout,
  data () {
    return {
      activityEditor: "NormalActivityPreview",
      showFloor: false,
      selectedTabbarIndex: 0,
      lastSelectedTabbarIndex: 0,
      tabbarActivity: {},
      showNavbar: false,
      canGoback: false
    }
  },
  props: {
  },
  created() {
    this.load()
  },
  methods: {
    load: function() {
      var cannotGoback = document.referrer === ''
      if (this.layout.param.navbarType == 3) {
        this.showNavbar = false
      } else if (this.layout.param.navbarType == 2) {
        this.showNavbar = true
      } else if (this.layout.param.navbarType == 1) {
        this.showNavbar = !cannotGoback
      }

      this.canGoback = !cannotGoback
      if (this.layout.param.tabbars == null || this.layout.param.tabbars.length == 0) {
        this.layout.param.tabbars = [{
          "name": "首页",
          "id": 0,
          "icon": "home-o"
        }]
      }

      this.createOrQueryActivity()
    },
    createOrQueryActivity() {
      var that = this
      var layout = this.layout.param.tabbars[this.selectedTabbarIndex]
      var activity = this.tabbarActivity[layout.id]
      var activityId = layout.activityId
      if (null != activity) {
        var offsetY = null == activity.floorOffsetY ? 0 : activity.floorOffsetY
        this.$nextTick(() => {
          window.scrollTo(0, offsetY)
        });
        this.currentActivity = activity
        this.showFloor = true
        this.$forceUpdate()
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
          window.scrollTo(0, 0)
          that.isLoading = false
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
      var layout = this.layout.param.tabbars[this.lastSelectedTabbarIndex]
      var activity = this.tabbarActivity[layout.id]
      activity.floorOffsetY = window.scrollY
      this.lastSelectedTabbarIndex = this.selectedTabbarIndex

      this.createOrQueryActivity()
    },
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layout_editor {
  width: 100%;
  height: 100%;
}

#navbar_blank {
  width: 100%;
  height: 46px;
}

#tabbar_blank {
  width: 100%;
  height: 50px;
}
</style>
