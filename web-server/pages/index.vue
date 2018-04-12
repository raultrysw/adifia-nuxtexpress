<template>
  <section class="root-page">
    <adifia-slider />
    <section class="root-page__section root-page__section--articles">
      <h3 class="root-page__section__title">Últimos artículos</h3>
      <div class="root-page__section root-page__section--content">
        <div class="article" v-for="(article, index) in articles" :key="index">
          <h4><nuxt-link :to="'/articles/' + article._id">{{article.title}}</nuxt-link></h4>
        </div>
      </div>
    </section>
    <section class="root-page__section root-page__section--photos">
      <h3>Últimas fotos</h3>
      <div class="root-page__section root-page__section--content gallery">
        <div class="photo" v-for="(photo, index) in photos" :key="index">
          <h4>{{photo.title}}</h4>
          <img :src="'http://localhost:7000/assets/img/photos/' + photo._id + '.jpg'" alt="">
          <p>{{photo.description}}</p>
        </div>
      </div>
        <p><nuxt-link to="/photos">Ver mas fotos </nuxt-link></p>
    </section>
  </section>
</template>

<script>
const articlesURI = '/articles?limit=3'
const photosURI = '/photos?limit=3&sort=likes'

import AdifiaSlider from '~/components/AdifiaSlider.vue'
export default {
  components: {AdifiaSlider},
  data() {
    return {
      articles: [],
      photos: []
    }
  },
  created() {
    const articlesReq = this.$http.get(articlesURI)
    const photosReq = this.$http.get(photosURI)

    Promise.all([articlesReq, photosReq]).then(responses => {
      let [articles, photos] = responses.map(r => r.data)
      this.articles = articles.data.articles
      this.photos = photos.data.photos

      this.$store.commit('context',{title:'Página pincipal', bar: ''})
    })
  }
}
</script>