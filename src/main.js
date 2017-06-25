import Vue from 'vue'
import axios from 'axios'
import * as io from 'socket.io-client'

import App from './App.vue'

var http = axios.create()
Vue.prototype.$http = http

var events = new Vue()
Vue.prototype.$events = events

var socket = io.connect('http://localhost:8080');
Vue.prototype.$socket = socket

new Vue({
  el: '#app',
  render: h => h(App)
})
