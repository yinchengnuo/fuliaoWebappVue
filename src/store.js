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
    tuijianLock: true,
    caiyiLock: true,
    meiliLock: true,
    hangzhouLock: true,
    yinchengnuo: {
      sex: 1,
      status: 0,
      mlevel: 0,
      userid: 26307780,
      totalWealthLevel: 4,
      userpic: 'http://img2.ipaychat.com/d3/photos/0/026/307/780.jpg?1553396270712',
      vlevel: 0,
      city: '杭州市',
      isCustom: 0,
      leveltype: 1,
      rank: 0,
      level: 0,
      name: '尹成诺',
      privilegeLevel: 0,
      guardFlag: false,
      age: 23,
      focus: 33,
      fans: 12,
      send: 123,
      featurn: 521,
      lable: ['吃饭', '睡觉', '打豆豆'],
      sign: '人生， 无非就是拉拉扯扯。'
    }
  },
  mutations: {
    get (state, channel) {
      if (channel === 'tuijian') {
        if (state.tuijianLock) {
          state.tuijianLock = false
          if (state.tuijianPage) {
            Axios.get(`http://39.96.73.206:8888/tuijian?page=${state.tuijianPage}`).then((response) => {
              state.liveListInfo['推荐'] = state.liveListInfo['推荐'].concat(response.data.info)
              state.tuijianPage++
              if (response.data.info.length < 14) {
                state.tuijianPage = 0
              }
              state.tuijianLock = true
            })
          }
        }
      } else if (channel === 'caiyi') {
        if (state.caiyiLock) {
          state.caiyiLock = false
          if (state.caiyiPage) {
            Axios.get(`http://39.96.73.206:8888/caiyi?page=${state.caiyiPage}`).then((response) => {
              state.liveListInfo['才艺'] = state.liveListInfo['才艺'].concat(response.data.info.channelList)
              state.caiyiPage++
              if (response.data.info.channelList.length < 14) {
                state.caiyiPage = 0
              }
              state.caiyiLock = true
            })
          }
        }
      } else if (channel === 'meili') {
        if (state.meiliLock) {
          state.meiliLock = false
          if (state.meiliPage) {
            Axios.get(`http://39.96.73.206:8888/meili?page=${state.meiliPage}`).then((response) => {
              state.liveListInfo['魅力'] = state.liveListInfo['魅力'].concat(response.data.info)
              state.meiliPage++
              if (response.data.info.length < 14) {
                state.meiliPage = 0
              }
              state.meiliLock = true
            })
          }
        }
      } else if (channel === 'hangzhou') {
        if (state.hangzhouLock) {
          state.hangzhouLock = false
          if (state.hangzhouPage) {
            Axios.get(`http://39.96.73.206:8888/hangzhou?page=${state.hangzhouPage}`).then((response) => {
              state.liveListInfo['杭州'] = state.liveListInfo['杭州'].concat(response.data.info)
              state.hangzhouPage++
              if (response.data.info.length < 14) {
                state.hangzhouPage = 0
              }
              state.hangzhouLock = true
            })
          }
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
