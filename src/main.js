import Vue from 'vue'
import VueRouter from 'vue-router'
import * as io from 'socket.io-client'
import VueClipboard from 'vue-clipboard2'
import VueHighlightJS from 'vue-highlight.js'

// Setup

Vue.use(VueClipboard)
Vue.use(VueHighlightJS)
import 'highlight.js/styles/vs2015.css'

var events = new Vue()
Vue.prototype.$events = events

//var socket = io.connect('http://localhost:8042')
var socket = io()
Vue.prototype.$socket = socket

// Router

Vue.use(VueRouter)

import App from './App.vue'
import Home from './routes/Home.vue'
import Run from './routes/Run.vue'
import About from './routes/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/run', component: Run },
  { path: '/about', component: About }
]

const router = new VueRouter({ routes, mode: 'history' })

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')