import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import faceTime from '@/views/faceTime.vue'
// import clock from '@/views/apps/clock/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: home,
    children: [{
        path: 'faceTime',
        name: 'faceTime',
        component: faceTime
    // }, {
    //     path: 'clock',
    //     name: 'clock',
    //     component: clock
    }]
}]

const router = new VueRouter({
    routes
})

export default router
