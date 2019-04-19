import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import axios from 'axios'

Vue.use(VeeValidate)
Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
