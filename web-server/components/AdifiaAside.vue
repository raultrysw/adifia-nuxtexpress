<template>
  <aside class="app__aside">
      <div class="app__title-box">
        <adifia-logo />
        <h1 class="app__title" @click="$emit('close')" ><nuxt-link to="/">Adifia</nuxt-link></h1>
      </div>
      <adifia-navigator @closeAside="$emit('close')" />
      <adifia-login-box v-if="!logged" />
      <user-box v-else />
    </aside>
</template>
<script>
import {mapState} from 'vuex'
import AdifiaLoginBox from '~/components/AdifiaLoginBox.vue'
import UserBox from '~/components/UserBox.vue'
import AdifiaLogo from '~/components/AdifiaLogo.vue'
import AdifiaNavigator from '~/components/AdifiaNavigator.vue'

export default {
    components: {AdifiaLoginBox, UserBox, AdifiaLogo, AdifiaNavigator},
  computed: {
    ...mapState('sessions', ['logged'])      
  }
}
</script>
