import Vue from 'vue'
import * as io from 'socket.io-client'
import VueClipboard from 'vue-clipboard2'

import App from './App.vue'

var events = new Vue()
Vue.prototype.$events = events

var socket = io.connect('http://localhost:8042');
Vue.prototype.$socket = socket

Vue.use(VueClipboard);

new Vue({
  el: '#app',
  render: h => h(App)
})
