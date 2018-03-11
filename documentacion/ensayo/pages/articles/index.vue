<template lang="html">
  <v-container class="mr-5">
    <v-layout column>
      <post v-for="(article, index) in articles" :level="1" :id="index" :article="article" :key="index"></post>
    </v-layout>
  </v-container>
</template>

<script>
import Post from '../../components/_post.vue'
export default {
  components: {Post},
  mounted () {
    this.$store.state.title = 'Listado de artículos'
  },
  data () {
    return {
      articles: require('./pruebas/data.json')
    }
  }
}
</script>

<style lang="css">
</style>
