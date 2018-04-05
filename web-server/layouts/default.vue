<template>
  <div class="app" v-if="loaded">
    <adifia-header class="app__header" v-model="showingAside"/>
    <adifia-aside @close="() => showingAside = false" v-if="showingAside"/>
    <main v-if="!showingAside" class="app__main">
      <header class="app__toolbar" >
        <h1 class="app__title-page" >{{currentTitle}}</h1>
        <div v-if="currentBar && isAdmin" :is="currentBar"></div>
      </header>
      <section class="app__main-content" is="nuxt"></section>
    </main> 
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

import AdifiaAside from '~/components/AdifiaAside.vue'
import AdifiaHeader from '~/components/AdifiaHeader.vue'

import AdifiaPhotoToolbar from '~/components/AdifiaPhotoToolbar.vue'

export default {
  components: {AdifiaAside, AdifiaHeader, AdifiaPhotoToolbar},
  data() {
    return {
      smallDevice: false,
      showingAside: false
    }
  },
  mounted() {
    let localArticles = localStorage.getItem('savedArticles')
    
    if (!localArticles) {
      let localArticlesObject = {
        new: {}
      }
      localStorage.setItem('savedArticles', JSON.stringify(localArticlesObject))
    }

    if(!this.logged) this.$store.dispatch('recoverUser')
    let m = matchMedia('(max-width: 1024px)')
    m.addListener(() => {
      this.smallDevice = m.matches
      
    })
  },
  computed: {
    ...mapState(['currentTitle', 'loaded', 'currentBar']),
    ...mapGetters('sessions', ['isAdmin'])
  }
}
</script>


<style lang="scss">
@import '../scss/index.scss';
</style>