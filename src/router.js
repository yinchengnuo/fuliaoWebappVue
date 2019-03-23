import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from './views/AppIndex.vue'
import LiveList from './components/Live/LiveList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppIndex',
      component: AppIndex,
      meta: {
        index: 0,
        keepAlive: true
      },
      children: [
        {
          path: 'livelist',
          name: 'LiveList',
          component: LiveList,
          meta: {
            index: 0.1
          }
        },
        {
          path: 'smallvideo',
          name: 'smallvideo',
          component: () => import('./components/SmallVideo/SmallVideos.vue'),
          meta: {
            index: 0.2
          }
        },
        {
          path: 'videochat',
          name: 'VideoChat',
          component: () => import('./components/Videochat/RobotChat.vue'),
          meta: {
            index: 0.3
          }
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('./components/About/About.vue'),
          meta: {
            index: 0.4
          }
        }
      ],
      redirect: 'LiveList'
    },
    {
      path: '/live',
      name: 'Live',
      component: () => import('./views/Live.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/uesrindex',
      name: 'UserIndex',
      component: () => import('./views/UserIndex.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/videointroduction',
      name: 'VideoIntroduction',
      component: () => import('./views/VideoIntroduction.vue'),
      meta: {
        index: 3
      }
    }
  ]
})
