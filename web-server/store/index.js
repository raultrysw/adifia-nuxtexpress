import Vuex from 'vuex'

import sessions from './sessions'
import users from './users'
import articles from './articles'

const jwt = require('jsonwebtoken')
const SECRET_JWT_TOKEN = 'mi clave secreta tonta'

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
              'jwt-user-token': state.sessions.user === null ? false : jwt.sign(state.sessions.user, SECRET_JWT_TOKEN)
          }
        }
    },
      actions: {
        saveToken({state}, payload) {
            let token = jwt.sign(state.sessions.user, SECRET_JWT_TOKEN)
            localStorage.setItem('jwt-token', token)
        },
          recoverUser({state}) {
            let user = jwt.decode(localStorage.getItem('jwt-token'))
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