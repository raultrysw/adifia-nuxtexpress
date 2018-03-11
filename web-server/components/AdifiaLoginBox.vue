<template>
<form @submit.prevent="login" name="login-form">
    <ul>
        <li v-for="(message, index) in errorMessages" :key="index">{{message}}</li>
    </ul>
    <h2>¡Entra a adifia!</h2>
    <div>
        <label><span>Email</span><input type="text" name="email-user"/></label>
    </div>
    <div>
        <label><span>Password</span><input type="password" name="password-user"/></label>
    </div>
    <p><input type="submit" value="Entrar">,
    <nuxt-link to="/signup">registrese</nuxt-link> o
    <nuxt-link to="/about">Conozcanos</nuxt-link></p>
</form>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    computed: {
        ...mapState('sessions', ['errorMessages'])
    },
    methods: {
        ...mapActions('sessions', ['login'])
    }
}
</script>
