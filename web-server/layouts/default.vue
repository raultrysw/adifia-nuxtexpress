<template>
  <div class="app" v-if="loaded">
    <adifia-header v-if="smallDevice" />
    <adifia-aside v-else />
    <main class="app__main">
      <header class="app__header" >
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
    ...mapGetters('sessions', ['isAdmin'])
  }
}
</script>


<style lang="scss">
@import '../scss/colors.scss';
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700|Slabo+27px');

$aside-width: 300px;
$header-height: 3em;

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box !important;
}
body {
  font-family: 'Lato', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Slabo 27px', serif;
}
.app {
  height: 100vh;
  &__header {
    height: $header-height;
    border-bottom: 1px solid;
  }
  &__aside {
    position: fixed;
    height: 100%;
    width: $aside-width;
    float: left;
    border-right: 1px solid;
  }
  &__main {
    margin-left: $aside-width;
    &-content {
      margin-left: 20px;
      margin-right: 20px;
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
