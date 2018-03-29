import axios from 'axios'

const namespaced = true
let REGISTER_URL = 'http://localhost:7000/api/members'

let actions = {
    register(store, {user}) {
        return axios.post(REGISTER_URL, user)
    }
}

export default {namespaced, actions}