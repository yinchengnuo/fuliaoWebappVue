import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from './views/AppIndex.vue'
import LiveList from './components/Live/LiveList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/liveone',
      name: 'LiveOne',
      component: () => import('./views/LiveOne.vue'),
      meta: {
        index: 1.1
      }
    },
    {
      path: '/livetwo',
      name: 'LiveTwo',
      component: () => import('./views/LiveTwo.vue'),
      meta: {
        index: 1.2
      }
    },
    {
      path: '/livethr',
      name: 'LiveThr',
      component: () => import('./views/LiveThr.vue'),
      meta: {
        index: 1.3
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
