import Vue from 'vue'
import VueRouter from 'vue-router'
import * as io from 'socket.io-client'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueRouter)

var events = new Vue()
Vue.prototype.$events = events

var socket = io.connect('http://localhost:8042');
Vue.prototype.$socket = socket

Vue.use(VueClipboard);

import App from './App.vue'
import Home from './routes/Home.vue'
import Run from './routes/Run.vue'
import Share from './routes/Share.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/run/:id', component: Run },
  { path: '/share', component: Share }
]

const router = new VueRouter({ routes, mode: 'history' })

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');