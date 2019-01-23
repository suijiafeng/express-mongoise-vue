import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI, { locale })

Vue.config.productionTip = false


router.afterEach((to, from) => {
  let locale = localStorage.eleToken
  if (!locale) {
  router.push({ name: 'login' }); // 跳转login
  }
 });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')