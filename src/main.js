import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/reset.css'
import { Button, Layout, Modal, Form, Input, Select, DatePicker } from "ant-design-vue";

Vue.use(Button)
Vue.use(Layout)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(DatePicker)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
