import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    liveListInfo: {
      '推荐': [],
      '才艺': [],
      '魅力': [],
      '杭州': []
    },
    tuijianPage: 1,
    caiyiPage: 1,
    meiliPage: 1,
    hangzhouPage: 1,
    UserIndexScrollTop: 0,
    UserIndexUserinfo: null
  },
  mutations: {
    get (state, channel) {
      if (channel === 'tuijian') {
        if (state.tuijianPage) {
          state.getMore = true
          Axios.get(`http://39.96.73.206:8888/tuijian?page=${state.tuijianPage}`).then((response) => {
            state.liveListInfo['推荐'] = state.liveListInfo['推荐'].concat(response.data.info)
            state.getMore = false
            state.tuijianPage++
            if (response.data.info.length < 14) {
              state.tuijianPage = 0
            }
          })
        }
      } else if (channel === 'caiyi') {
        if (state.caiyiPage) {
          state.getMore = true
          Axios.get(`http://39.96.73.206:8888/caiyi?page=${state.caiyiPage}`).then((response) => {
            state.liveListInfo['才艺'] = state.liveListInfo['才艺'].concat(response.data.info.channelList)
            state.getMore = false
            state.caiyiPage++
            if (response.data.info.channelList.length < 14) {
              state.caiyiPage = 0
            }
          })
        }
      } else if (channel === 'meili') {
        if (state.meiliPage) {
          state.getMore = true
          Axios.get(`http://39.96.73.206:8888/meili?page=${state.meiliPage}`).then((response) => {
            state.liveListInfo['魅力'] = state.liveListInfo['魅力'].concat(response.data.info)
            state.getMore = false
            state.meiliPage++
            if (response.data.info.length < 14) {
              state.meiliPage = 0
            }
          })
        }
      } else if (channel === 'hangzhou') {
        if (state.hangzhouPage) {
          state.getMore = true
          Axios.get(`http://39.96.73.206:8888/hangzhou?page=${state.hangzhouPage}`).then((response) => {
            state.liveListInfo['杭州'] = state.liveListInfo['杭州'].concat(response.data.info)
            state.getMore = false
            state.hangzhouPage++
            if (response.data.info.length < 14) {
              state.hangzhouPage = 0
            }
          })
        }
      }
    }
  },
  actions: {
    getAsync (context, channel) {
      context.commit('get', channel)
    }
  }
})
