import Vuex from 'vuex'

import sessions from './sessions'
import users from './users'
import articles from './articles'
import photos from './photos'

const {encode, decode} = require('../../utils/user-token')

const createStore = () => {
  return new Vuex.Store({
      modules: {sessions, users, articles, photos},
      state: {
          currentTitle: 'Sin título',
          loaded: false,
          currentBar: ''
      },
      mutations: {
        context(state, {title, bar}) {
            document.title = 'Adifia | ' + title
            state.currentTitle = title
            state.currentBar = 'adifia-' + bar + '-toolbar'
            console.log('current toolbar', state.currentBar);
            
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
            console.log('token salvado');
            
        },
          recoverUser({state}) {
              let token = localStorage.getItem('jwt-token')
              
            let user = token && decode(token)
            if (user != null) {
                const {name, surname, email, pvLvl, _id, avatar, photos} = user
                state.sessions.user = {name, surname, email, pvLvl, _id, avatar, photos}
                console.log(state.sessions.user);
                
                state.sessions.logged = true
            }
            state.loaded = true
          }
      }
  })
}

export default createStore