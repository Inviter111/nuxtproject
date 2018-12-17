export const state = () => ({
  user: {
    login: ''
  }
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  getUSer(state) {
    return state.user.login
  }
}