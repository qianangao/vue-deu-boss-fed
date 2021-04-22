import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:null //记录用户登陆状态
    user: JSON.parse(localStorage.getItem('user') || 'null')
  },
  mutations: {
    // 修改容器必须使用mutation函数
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 为了防止页面刷新，数据丢失，我们需要将user数据持久化
      // 本地存储只能存储字符串
      localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
