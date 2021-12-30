import { createStore, StoreOptions } from 'vuex'

const store: StoreOptions<{ token: string | null }> = {
  state: {
    token: '',
  },
  getters: {
    getToken: (state) => state.token,
  },
  mutations: {
    setToken(state, value: string | null) {
      state.token = value
    },
  },
}

export default createStore(store)
