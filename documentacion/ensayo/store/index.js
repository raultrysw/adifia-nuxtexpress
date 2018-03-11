import vuex from 'vuex'

let data = require('./data.json')
const createStore = () => new vuex.Store({
  state: data,
  mutations: {
    setLogin (state, payload) {
      let email = payload.email
      let pass = payload.pass
      if (Object.keys(data.users).indexOf(email) >= 0) {
        if (data.users[email].password === pass) {
          state.logged = true
          state.user = data.users[email]
        }
      }
    }
  }
})

export default createStore
