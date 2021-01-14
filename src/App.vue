<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
import {install as HttpInstall} from './util/HttpRequest.js'
import {install as EasyInstall} from './util/EasyUtils.js'

export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  created() {
    HttpInstall(this)
    EasyInstall(this)
  },
  methods: {
    showMessage(message, type) {
      this.$message({
          message: message,
          type: type
      });
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}
</style>
