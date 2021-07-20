import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSocketIO from 'vue-socket.io'
import websocket from 'vue-native-websocket'

import $ from 'jquery';
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.use(websocket, 'wss://itriptaiwan.megatime.com.tw/string/SocketHandler/AppHandler.ashx', { 
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
})

new Vue({
    router,
    store,
    $,
    VueSocketIO,
    render: h => h(App)
}).$mount('#app')