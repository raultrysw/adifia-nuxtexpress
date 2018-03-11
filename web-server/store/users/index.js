import axios from 'axios'

const namespaced = true
let REGISTER_URL = 'http://localhost:7000/api/members'

let actions = {
    register({}, cb) {
        let newUserForm = document.forms['new-user-form']
        let user = {
            name: newUserForm['name-user'].value,
            surname: newUserForm['surname-user'].value,
            email: newUserForm['email-user'].value,
            password: newUserForm['password-user'].value,
        }
        axios.post(REGISTER_URL, user).then(cb)
    }
}

export default {namespaced, actions}