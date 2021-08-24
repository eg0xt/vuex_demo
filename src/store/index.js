import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(item => item.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') { return state.list }
      if (state.viewKey === 'undone') {
        return state.list.filter(item => item.done === false)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(item => item.done === true)
      }
    }
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, value) {
      state.inputValue = value
    },
    addListItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    deleteListItem (state, id) {
      const index = state.list.findIndex(item => item.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
      state.nextId--
    },
    changeItemDone (state, params) {
      const index = state.list.findIndex(item => item.id === params.id)
      if (index !== -1) {
        state.list[index].done = params.status
      }
    },
    deleteListDoneItem (state) {
      state.list = state.list.filter(item => item.done === false)
    },
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    async getList (context) {
      const { data } = await axios.get('/list.json')
      context.commit('initList', data)
    }
  }
})
