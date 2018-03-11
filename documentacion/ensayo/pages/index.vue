<template>
  <v-container class="mr-5">
    <v-layout column class="d-flex">
      <v-flex>
        <h1 class="title">Bienvenido a adifia</h1>
        <slider></slider>
      </v-flex>
      <v-flex>
        <h1 class="title">Últimos artículos</h1>
        <v-layout>
          <v-flex style="max-width: 60vw">
            <post :level="1" :article="articles[0]" id="0"></post>
          </v-flex>
          <v-flex>
            <v-layout column>
              <post v-for="(num, index) in [1,2,3]" :id="num" :key="index" :article="articles[num]"></post>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Slider from '~/components/Slider.vue'
import Post from '~/components/_post.vue'
export default {
  data () {
    return {
      articles: require('./articles/pruebas/data.json')
    }
  },
  mounted () {
    this.$store.state.title = 'Página principal'
  },
  components: {
    Slider, Post
  }
}
</script>

<style>
</style>
