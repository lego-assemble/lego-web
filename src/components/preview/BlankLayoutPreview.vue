<template>
  <div>
    <van-nav-bar :title="currentActivity.name" left-text="返回" v-if="showFloor && canGoback" left-arrow v-show="showNavbar"></van-nav-bar>
    <van-nav-bar :title="currentActivity.name" v-if="!canGoback" v-show="showFloor && showNavbar"></van-nav-bar>
    <div id="layout_editor" v-if="showFloor">
      <component
      :is="activityEditor"
      :activity="currentActivity"
      ></component>
    </div>
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
      showNavbar: false,
      canGoback: false
    }
  },
  props: {
  },
  created() {
    this.createOrQueryActivity()
  },
  methods: {
    createOrQueryActivity() {
      var canGoback = document.referrer === ''
      if (this.layout.param.navbarType == 3) {
        this.showNavbar = false
      } else if (this.layout.param.navbarType == 2) {
        this.showNavbar = true
      } else if (this.layout.param.navbarType == 1) {
        this.showNavbar = canGoback
      }

      this.canGoback = canGoback
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
    },
    goBack: function(){
      window.history.go(-1);
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
</style>
