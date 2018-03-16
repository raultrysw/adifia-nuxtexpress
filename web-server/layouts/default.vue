<template>
  <div class="app main-start" v-if="loaded">
    <aside class="app__aside">
      <adifia-logo />
      <h1 class="app__title" ><nuxt-link to="/">Adifia</nuxt-link></h1>
      <ul class="no-list nav nav--horizontal">
        <li class="nav__item"><nuxt-link to="/articles">Blog</nuxt-link></li>
        <li class="nav__item"><nuxt-link to="/photos">Foto denuncia</nuxt-link></li>
      </ul>
      <adifia-login-box v-if="!logged" />
      <user-box v-else />
    </aside>
    <main class="app__main main-start flex-column">
      <header class="app__header" >
        <h1 class="app__title-page" >{{currentTitle}}</h1>
      </header>
      <section class="app__main-content" is="nuxt"></section>
    </main> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AdifiaLoginBox from '~/components/AdifiaLoginBox.vue'
import UserBox from '~/components/UserBox.vue'
import AdifiaLogo from '~/components/AdifiaLogo.vue'

export default {
  components: {AdifiaLoginBox, UserBox, AdifiaLogo},
  mounted() {
    if(!this.logged) this.$store.dispatch('recoverUser')
  },
  computed: {
    ...mapState(['currentTitle', 'loaded']),
    ...mapState('sessions', ['logged'])
  }
}
</script>


<style lang="scss">
@import 'ed-grid/css/ed-grid.min.css';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box !important;
}
.app {
  height: 100vh;
  width: 100vw;
  &__header {
    border-bottom: 1px solid;
  }
  &__aside {
    width: 200px;
    border-right: 1px solid;
  }
  &__main {
    flex-grow: 1;
    &-content {
      padding: 0em .5em;
    }
  }
  &__title, &__title-page {
    text-align: center;
  }
}
.no-list {
  list-style-type: none;
}
.nav {
  &--horizontal {
    display: flex;
    border-width: 1px 0px;
    border-style: solid;
    text-align: center;
  }
  &--horizontal > &__item {
    margin: .25em .5em;
  }
}
</style>
