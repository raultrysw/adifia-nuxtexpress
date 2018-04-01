<template>
  <section v-if="loaded">
      <adifia-article level="2" :article="article" v-if="article" />
  </section>
</template>
<script>
import AdifiaArticle from '~/components/AdifiaArticle'
import axios from 'axios'

let URI_TO_ARTICLES = 'http://localhost:7000/api/articles/:id'

export default {
    components: {AdifiaArticle},
    mounted() {
         axios.get(this.uriArticle).then(response => {
             this.article = response.data.article
             let title = 'Blog - ' + this.article.title

             this.$store.commit('context', {title, bar: ''})
             this.loaded = true
         })
    },
    computed: {
        uriArticle() {
            return URI_TO_ARTICLES.replace(':id', this.$route.params.id)
        }
    },
    data() {
        return {
            article: null,
            loaded: false
        }
    }
}
</script>
