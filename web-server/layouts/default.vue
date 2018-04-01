<template>
  <div :class="rootAppStyles" v-if="loaded">
    <adifia-header v-if="smallDevice" />
    <adifia-aside v-else />
    <main class="app__main main-start flex-column">
      <header class="app__header main-justify cross-center" >
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
      smallDevice: false
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
    ...mapGetters('sessions', ['isAdmin']),
    rootAppStyles() {
      return {
        app: true,
        'main-start': !this.smallDevice
      }
    }
  }
}
</script>


<style lang="scss">
@import 'ed-grid/css/ed-grid.min.css';
@import '../scss/colors.scss';

$panelBackground: lighten($color-primary-0, 25%);


* {
  padding: 0;
  margin: 0;
  box-sizing: border-box !important;
}
.app {
  height: 100vh;
  width: 100vw;
  &__header {
    margin-bottom: 1em;
    background: $panelBackground;
    box-shadow: 0px -3px 10px 0 darken($panelBackground, 10%) inset;
  }
  &__aside {
    background: $panelBackground;
    @media screen and (min-width: 1024px) {
      flex-basis: 250px;
    }
  }
  &__main {
    @media screen and (min-width: 1024px) {
      flex-basis: calc(100% - 250px);
      &-content {
        min-width: 75vw;
        margin: 0em auto;
      }
    }
  }
  &__title {
    text-align: center;
    margin: .4em 0em;
  }
  &__title, &__title-page, &__navigator-bar {
    font-family: serif;
    text-decoration: underline overline;
    letter-spacing: 0.13em;
    text-shadow: 0px 0px 3% black;
  }
  &__navigator-bar {
    justify-content: center;
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
table {
  width: 100%
}
.svg-inline--fa {
  cursor: pointer;
  margin: 0 .3em;
}
.fab-bar {
    position: absolute;
    bottom: 16px;
    right: 16px;
    font-size: 2em;
}
</style>
