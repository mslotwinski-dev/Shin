import { createStore, StoreOptions } from 'vuex'

const store: StoreOptions<{
  token: string | null
  allRequests: number
  doneRequests: number
}> = {
  state: {
    token: '',
    allRequests: 0,
    doneRequests: 0,
  },
  getters: {
    getToken: (state) => state.token,
    getAllRequests: (state) => state.allRequests,
    getDoneRequests: (state) => state.doneRequests,
  },
  mutations: {
    setToken(state, value: string | null) {
      state.token = value
    },
    setAllRequests(state, value: number) {
      state.allRequests += value
    },
    pushRequest(state) {
      state.doneRequests++
    },
  },
}

export default createStore(store)
