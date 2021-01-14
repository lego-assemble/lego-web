import Vue from 'vue'
import Router from 'vue-router'
import LegoHomePage from '@/components/homepage/LegoHomePage'
import LegoApplicationEditor from '@/components/controller/LegoApplicationEditor'
import LegoApplicationPreview from '@/components/preview/LegoApplicationPreview'
import LegoEditor from '@/components/editor/LegoEditor'
import NormalActivityPreview from '@/components/preview/NormalActivityPreview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LegoHomePage',
      component: LegoHomePage
    },
    {
      path: '/preview',
      name: 'NormalActivityPreview',
      component: NormalActivityPreview
    },
    {
      path: '/app',
      name: 'LegoApplicationEditor',
      component: LegoApplicationEditor
    },
    {
      path: '/edit',
      name: 'LegoEditor',
      component: LegoEditor
    },
    {
      path: '/view',
      name: 'LegoApplicationPreview',
      component: LegoApplicationPreview
    }
  ]
})
