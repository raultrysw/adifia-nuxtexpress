<template>
  <section>
      <h2>Blog</h2>
      <h3 v-if="!loaded">Cargando artículos...</h3>
      <div v-else>
          <h4 v-if="!articles.length">No hay ningun artículo publicado</h4>
          <template v-else>
              <h3>Listado de artículos</h3>
              <adifia-article level="0" :article="article" v-for="(article, index) in articles" :key="index" />
          </template>
        <p v-if="isVocal"><nuxt-link to="/articles/create">Crear un articulo</nuxt-link></p>
      </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AdifiaArticle from '~/components/AdifiaArticle'
export default {
  components: {AdifiaArticle},
  data() {
    return {
      articles: [],
      loaded: false
    };
  },
  created() {
    this.$store.commit("title", "Blog de adifia");
  },
  computed: {
    ...mapGetters("sessions", ["isVocal"])
  },
  mounted() {
    this.$store._actions["articles/getArticles"][0](response => {
      let { articles } = response.data;
      this.articles = articles;
      this.loaded = true;
    });
  },
  mehtods: {
    ...mapActions("articles", ["getArticles"])
  }
};
</script>
