<template lang="html">
  <v-container class="mr-5">
    <v-layout column>
      <post :article="article" level="2"></post>
    </v-layout>
  </v-container>
</template>

<script>
import Post from '../../components/_post.vue'
export default {
  components: {Post},
  props: ['id'],
  data () {
    return {
      article: {}
    }
  },
  mounted () {
    this.article = require('./pruebas/data.json')[this.$route.params.id]
    this.$store.state.title = this.article.title
  }
}
</script>

<style lang="css">
</style>
