<template>
  <div v-if="showUi">
      <form v-if="!logged" @submit.prevent="registerUser" name="new-user-form">
            <div>
                <label><span>Nombre</span><input type="text" name="name-user"/></label>
            </div>
            <div>
                <label><span>Apellidos</span><input type="text" name="surname-user"/></label>
            </div>
            <div>
                <label><span>Email</span><input type="text" name="email-user"/></label>
            </div>
            <div>
                <label><span>Contraseña</span><input type="pass" name="password-user"/></label>
            </div>
            <p><input type="submit" value="Registrarse"></p>    
      </form>
      <h2 v-else>Te has logueado, <nuxt-link to="/">Vuelve a la página principal</nuxt-link></h2>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
export default {
    data() {
        return {
            showUi: false
        }
    },
    computed: {
        ...mapState('sessions', ['logged'])
    },
    created() {
        if (this.$store.state.logged) {
            return this.$router.push('/')
        }
        this.$store.commit('title','Registrate en Adifia')  
        this.showUi = true    
    },
    methods: {
        ...mapActions('users', ['register']),
        registerUser() {
            this.register(response => {
                if (response.data.status === 'ok') this.$router.push('/')
            })
        }
    }
}
</script>
