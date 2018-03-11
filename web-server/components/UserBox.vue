<template>
  <div class="userbox">
    <p class="userbox__greet">Bienvenido {{user.name}} {{user.surname}}</p>
    <ul class="no-list">
      <li><nuxt-link to="/profile">Ir a página de perfil</nuxt-link></li>
    </ul>
    <button class="userbox__logout-button" @click="logout"><nuxt-link to="/">Logout</nuxt-link></button>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
      ...mapState('sessions', ['user'])
  },
  methods: {
    ...mapActions('sessions', ['logout'])        
  }
}
</script>
<style lang="scss">
.userbox {
  border: 1px solid;
  margin: .25em;
  padding: .25em;
  &__logout-button > a {
    color: black;
  }
}
</style>
