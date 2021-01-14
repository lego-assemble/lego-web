<template>
  <div v-if="showActivity">
    <van-pull-refresh v-model="isLoading" @refresh="refresh">
     <div v-for="floor in currentActivity.floors" :key="floor.id">
        <div v-if="floor.type == null || floor.type == 'normal'">
          <component
          :is="floor.code"
          :floor="floor"
          :context="context"
          ></component>
        </div>
        <van-list
          v-if="floor.type != null && floor.type != 'normal'"
          v-model="floor.loading"
          :finished="floor.loadingFinished"
          @load="floorLoadExt(floor)"
        >
          <div v-for="(contentFloor, idx) in floor.contentFloors" :key="contentFloor.id + '_' + idx">
          <component
          :is="contentFloor.code"
          :floor="contentFloor"
          :context="context"
          ></component>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
/* eslint-disable */
import {get as GET, post as POST} from '../../util/HttpRequest.js'
import {formatMap} from '../../util/EasyUtils.js'

export default {
  data () {
    return {
      currentActivity:{},
      isLoading: false,
      context: null,
      showActivity: false
    }
  },
  props: {
    activity: {
      type: Object,
      required: false
    }
  },
  components: {
  },
  watch: {
    'activity': function(newVal){
        this.load()
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      if (null == this.activity) {
        this.refresh()
      } else {
        this.currentActivity = this.activity
        if (this.currentActivity.loadExt == null) {
          this.currentActivity.loadExt = "1"
          this.compile(true)
        } else {
          this.compile(false)
        }
      }
    },
    refresh() {
      var that = this
      GET("api/activity/detail", {
        activityId: this.activity.id
      }, function(content) {
        that.isLoading = false
        that.currentActivity = content
        that.compile(true)
      }, function(error) {
        that.isLoading = false
      });
    },
    compile(loadExt) {
      if (null == this.context) {
        this.context = {
          query: this.$route.query,
          activity: this.currentActivity
        }
      }
    
      formatMap(this.currentActivity, this.context)
      if (loadExt) {
        this.loadExtData()
      }
    },
    loadExtData() {
      var that = this
      var functions = this.currentActivity.functions
      if (null != functions && functions.length > 0) {
        var totalFunc = functions.length
        var reqInfo = {
          total: totalFunc,
          current: 0
        }

        var responseInfo = {}
        for (var index = 0; index < functions.length; index++) {
          var func = functions[index]
          this.loadFunction(func, function(res) {
            responseInfo[func.outputAlias] = res
            reqInfo.current = reqInfo.current + 1
            if (reqInfo.current == reqInfo.total) {
              for (var key in responseInfo) {
                that.context[key] = responseInfo[key]
              }

              that.compile(false)
              console.log(that.context)
              that.showActivity = true
            }
          })
        }
      } else {
        that.showActivity = true
      }
    },
    floorLoadExt(floor) {
      if (null == floor.loadingFinished) {
        floor.loadingFinished = false
      }

      if (floor.loadingFinished) {
        return
      }

      if (null == floor.function) {
        floor.loading = false
        floor.loadingFinished = true
      }

      if (null == floor.contentFloors) {
        floor.contentFloors = []
      }

      var func = floor.function
      var url = func.url
      var param = func.param
      url = url + "?" + param
      var that = this
      if (null == floor.loadPage) {
        floor.loadPage = 0
      }

      if (null == floor.originFloor) {
        floor.originFloor = JSON.parse(JSON.stringify(floor))
      }

      GET(url, {
        page: floor.loadPage + 1,
        size: 10
      }, function(content) {
        floor.loading = false

        // 列表和分页
        var contents = []
        if (floor.type == "list") {
          floor.loadingFinished = true
          contents = content
        } else if (floor.type == "page") {
          contents = content.items
          floor.loadPage = content.current
          floor.loadingFinished = !content.hasMore
        } else {
          floor.loadingFinished = true
        }
        
        for (var index = 0; index < contents.length; index++) {
          var item = contents[index]
          var contentFloor = JSON.parse(JSON.stringify(floor.originFloor))
          var context = {}
          var alias = floor.function.outputAlias
          if (null == alias) {
            alias = "funcRes"
          }

          context[alias] = {}
          context[alias]["item"] = item
          formatMap(contentFloor, context)
          floor.contentFloors.push(contentFloor)
        }
      }, function(error) {
        floor.loading = false
        floor.loadingFinished = true
      });
    },
    loadFunction(func, finish) {
      var url = func.url
      var param = func.param
      url = url + "?" + param
      var that = this
      GET(url, null, function(content) {
        finish(content)
      }, function(error) {
        finish()
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
