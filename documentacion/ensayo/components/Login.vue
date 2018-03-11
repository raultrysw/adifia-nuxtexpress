<template lang="html">
  <v-card>
    <v-card-title class="pa-0">
      <div class="">
        <h3 class="title">Login</h3>
        <v-form ref="loginForm" @submit.prevent="login">
          <v-text-field type="text" name="email" label="Correo electrónico"></v-text-field>
          <v-text-field type="password" name="password" label="Contraseña"></v-text-field>
          <div class="">
            <v-btn type="submit">Entrar</v-btn>
            <nuxt-link to="/users/signup" class="btn">Registrarse</nuxt-link>
          </div>
        </v-form>
      </div>
      <div class="">
        <usefull-links></usefull-links>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import UsefullLinks from './UseFullLinks.vue'
export default {
  components: {UsefullLinks},
  methods: {
    login () {
      const form = this.$refs.loginForm.$el
      const payload = {
        email: form['email'].value,
        pass: form['password'].value
      }
      this.$store.commit('setLogin', payload)
    }
  }
}
</script>

<style lang="css">
</style>
