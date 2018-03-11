<template lang="html">
  <v-navigation-drawer class="pa-0" cipped permanent app>
    <h1 class="display-2 title-page">
      <Logo></Logo>
      <nuxt-link class="link-to-main" to="/">Adifia</nuxt-link>
    </h1>
    <div class="">
      <h1 class="title">Secciones</h1>
      <div class="links">
        <nuxt-link :to="page.url" class="btn ma-0 pa-0" v-for="(page, index) in sections" :key="index">{{page.text}}</nuxt-link>
      </div>
    </div>
    <login v-if="!logged"></login>
    <user-box v-else></user-box>
    <nuxt-link class="btn link-to-about headline" to="/about">Conocenos</nuxt-link>
  </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex'
import Login from './Login.vue'
import Logo from './logo.vue'
import UserBox from './UserBox.vue'
export default {
  components: {Login, Logo, UserBox},
  computed: {
    ...mapState(['logged'])
  },
  data () {
    return {
      sections: [
        {url: '/articles', text: 'Blog'},
        {url: '/photos', text: 'Foto denuncia'}
      ]
    }
  }
}
</script>

<style lang="css">
.links {
  display: flex;
  justify-content: space-around;
  border-width: 1px 0px;
  border-style: solid;
  padding: .75em 0em;
}
.link-to-about {text-align: center;}
.title-page {
  text-align: center;
}
.link-to-main {
  text-align: center;
  display: block;
}
</style>
