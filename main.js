import Vue from 'vue'
import App from './App'
import Creq from './uni_modules/explain-creq/js_sdk/explain-creq.js'
import CreqInterceptorRequest from './common/creq.interceptor.request.js'
import CreqInterceptorCallFunction from './common/creq.interceptor.callfunction.js'

Vue.config.productionTip = false

Vue.prototype.$creq = Creq
Vue.prototype.$creq.interceptor.request = CreqInterceptorRequest
Vue.prototype.$creq.interceptor.callFunction = CreqInterceptorCallFunction

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
