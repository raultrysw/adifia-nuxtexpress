import Vuex from 'vuex'

import sessions from './sessions'
import users from './users'
import articles from './articles'

const {encode, decode} = require('../../utils/user-token')

const createStore = () => {
  return new Vuex.Store({
      modules: {sessions, users, articles},
      state: {
          currentTitle: 'Sin título',
          loaded: false
      },
      mutations: {
        title(state, title) {
            document.title = 'Adifia | ' + title
            state.currentTitle = title
        }
      },
      getters: {
        headers(state) {
          return {
              'jwt-user-token': state.sessions.user === null ? false : encode(state.sessions.user)
          }
        }
    },
      actions: {
        saveToken({state}, payload) {
            let token = encode(state.sessions.user)
            localStorage.setItem('jwt-token', token)
        },
          recoverUser({state}) {
            let user = decode(localStorage.getItem('jwt-token'))
            if (user != null) {
                const {name, surname, email, pvLvl, _id, avatar} = user
                state.sessions.user = {name, surname, email, pvLvl, _id, avatar}
                console.log(state.sessions.user);
                
                state.sessions.logged = true
            }
            state.loaded = true
          }
      }
  })
}

export default createStore