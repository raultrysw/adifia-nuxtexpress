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

import Vue, {prototypes} from 'vue'

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
            const {Credentials} = this.prototypes, url = LOGIN_URL
            let payload = {url, data: new Credentials(e.target)}
            this.makeRequest(payload, 'post', this.setSession.bind(this), this.logErrors.bind(this))
        },
        setSession({user}) {
            const {User} = this.prototypes
            this.session(new User(user))               
        },
        logErrors(response) {
            if (response.status === 404) {
                this.errorMessages = []
                setTimeout(() => {
                    this.errorMessages.push('Usuario no encontrado')
                }, 75)
            }
        },
        ...mapMutations('sessions', ['session'])
    }
}
</script>
