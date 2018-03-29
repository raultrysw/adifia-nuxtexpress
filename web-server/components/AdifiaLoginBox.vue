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
import {mapActions, mapState} from 'vuex'

export default {
    components: {rswForm, rswFieldInput},
    computed: {
        ...mapState('sessions', ['errorMessages'])
    },
    methods: {
        ...mapActions('sessions', ['login'])
    }
}
</script>
