import axios from 'axios'
let namespaced = true


let state = {
    errorMessages: [],
    logged: false,
    user: null
}

let getters = {
    isVocal(state) {
        return state.user && state.user.pvLvl > 0
    },
    isAdmin(state) {
        return state.user && state.user.pvLvl > 1
    },
    avatarUrl(state) {
        let defaultImg = 'http://localhost:7000/assets/img/avatars/default.png'
        return state.user && !state.user.avatar ? defaultImg : 'http://localhost:7000/assets/img/avatars/' + state.user._id + '.jpg'
    },
    token(state) {
        return localStorage.getItem('jwt-token')
    }
}

let mutations = {
    likesUser(state, likesPhotos) {
        console.log(likesPhotos);
        
        state.user.photos = likesPhotos
    },
    session(state, user) {
        console.log('setting session');
        
        state.logged = true
        state.user = user
        localStorage.setItem('jwt-token', user.token)
        
    }
}

let actions = {
    
    logout({state, rootState}) {
        state.logged = false
        state.user = null
        localStorage.removeItem('jwt-token')
    },
    
    login({state, rootState, commit}, e) {
        
    }
}

export default {namespaced, state, actions, getters, mutations}