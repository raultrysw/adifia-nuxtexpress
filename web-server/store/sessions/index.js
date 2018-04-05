import axios from 'axios'
let namespaced = true

const LOGIN_URL = 'http://localhost:7000/api/members/login'

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
    }
}

let actions = {
    
    logout({state, rootState}) {
        state.logged = false
        state.user = null
        localStorage.removeItem('jwt-token')
    },
    
    login({state, rootState, commit}, e) {
        let form = e.target
        let user = {
            email: form['email-user'].value,
            password: form['password-user'].value
        }
        axios.post(LOGIN_URL, user).then(response => {
            state.errorMessages = []
            if (response.data.status === 'bad') {
                state.errorMessages.push(response.data.message)
                console.log(state.errorMessages);
                return
            }

            state.logged = true
            console.log(response.data.userFound);
            
            const {email, name, surname, pvLvl, _id, avatar, photos} = response.data.userFound
            state.user = {email, name, surname, pvLvl, _id, avatar, photos}
            console.log(state.user);
            
            
            localStorage.setItem('jwt-token', response.data.userFound.token)
        })
    }
}

export default {namespaced, state, actions, getters, mutations}