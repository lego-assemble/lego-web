// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import FormBuilder from 'element-form-builder'

/* eslint-disable */
Vue.config.productionTip = false

const templates = require.context('./components/', true, /\.vue/);
templates.keys().forEach(fileName => {
  const reqCom = templates(fileName)
  const reqComNames = fileName.split('/')
  const reqComName = fileName.split('/')[reqComNames.length - 1]
  const realName = reqComName.split('.')[0]
  Vue.component(realName, reqCom.default || reqCom)
})

Vue.use(ElementUI)
Vue.use(Vant)
Vue.use(FormBuilder)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
