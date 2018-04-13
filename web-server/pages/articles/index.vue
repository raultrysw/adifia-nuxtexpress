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
    let payload = {url: URI_ARTICLES_GET}
    this.makeRequest(payload, 'get', this.fillArticles.bind(this), this.logErrors.bind(this))
  },
  methods: {
    fillArticles({articles}) {
      this.articles = articles
      this.loaded = true
    },
    logErrors({errors}) {
      console.log(errors)
    }
  }
};
</script>
