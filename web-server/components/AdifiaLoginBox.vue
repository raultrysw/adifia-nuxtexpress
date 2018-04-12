<template>
<div>
    <rsw-form :errors="errorMessages" :submitHandler="login" submitText="entrar">
        <rsw-field-input text="Email" name="email-user" description="Pon tu correo electronico" type="email" />
        <rsw-field-input text="Password" name="password-user" description="Pon tu contraseña" type="password" />
    </rsw-form>
    <div>
        <h3>Y si no...</h3>
        <nuxt-link to="/signup">registrese</nuxt-link> o
        <nuxt-link to="/about">Conozcanos</nuxt-link>
    </div>
</div>
</template>

<script>
import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'
import {mapActions, mapState, mapMutations} from 'vuex'

const LOGIN_URL = 'http://localhost:7000/api/members/login'

export default {
    components: {rswForm, rswFieldInput},
    data() {
        return {
            errorMessages: []
        }
    },
    methods: {
        login(e) {
            let form = e.target
            let user = {
                email: form['email-user'].value,
                password: form['password-user'].value
            }
            const self = this
            let data = {
                url: LOGIN_URL,
                data: user
            }

            const cb = data => {
                let userFound = data.user
                const {email, name, surname, pvLvl, _id, avatar, photos, token} = userFound
                
                const user = {email, name, surname, pvLvl, _id, avatar, photos, token}
                self.session(user)   
            }
            const errorCb = response => {
                if (response.status === 404) {
                    this.errorMessages = []
                    setTimeout(() => {
                        this.errorMessages.push('Usuario no encontrado')
                    }, 75)
                }
            }

            this.recover(data, 'post', cb, errorCb)
        },
        ...mapMutations('sessions', ['session'])
    }
}
</script>
