<template>
  <aside class="app__aside">
      <adifia-logo />
      <h1 class="app__title" ><nuxt-link to="/">Adifia</nuxt-link></h1>
      <ul class="app__navigator-bar no-list nav nav--horizontal">
        <li class="nav__item"><nuxt-link to="/articles">Blog</nuxt-link></li>
        <li class="nav__item"><nuxt-link to="/photos">Foto denuncia</nuxt-link></li>
      </ul>
      <adifia-login-box v-if="!logged" />
      <user-box v-else />
    </aside>
</template>
<script>
import {mapState} from 'vuex'
import AdifiaLoginBox from '~/components/AdifiaLoginBox.vue'
import UserBox from '~/components/UserBox.vue'
import AdifiaLogo from '~/components/AdifiaLogo.vue'

export default {
    components: {AdifiaLoginBox, UserBox, AdifiaLogo},
  computed: {
    ...mapState('sessions', ['logged'])      
  }
}
</script>
