<template>
  <section>
      <h2 v-if="!loaded">Cargando artículos...</h2>
      <div v-else>
          <h2 v-if="!articles.length">No hay ningun artículo publicado</h2>
          <template v-else>
              <adifia-article level="0" :article="article" v-for="(article, index) in articles" :key="index" />
          </template>
      </div>
      <div class="fab-bar flex-column-reverse">
          <nuxt-link class="fab-bar__icon" to="/articles/edit"><font-awesome-icon icon="pen-square" /></nuxt-link>
      </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AdifiaArticle from '~/components/AdifiaArticle'

let URI_ARTICLES_GET = '/articles'
export default {
  components: {AdifiaArticle},
  data() {
    return {
      articles: [],
      loaded: false
    };
  },
  created() {
    this.$store.commit("context", {title: "Blog de adifia", bar: ''});
  },
  computed: {
    ...mapGetters("sessions", ["isVocal"])
  },
  mounted() {
    debugger
    this.$http.get(URI_ARTICLES_GET).then(response => {
        let { articles } = response.data;
        this.articles = articles;
        this.loaded = true;

    })
    // this.$http.get(URI_ARTICLES_GET).then(response => {
    // })
  },
  mehtods: {
    ...mapActions("articles", ["getArticles"])
  }
};
</script>
