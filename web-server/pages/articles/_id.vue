<template>
  <section v-if="loaded">
      <adifia-article level="2" :article="article" v-if="article" />
  </section>
</template>
<script>
import AdifiaArticle from '~/components/AdifiaArticle'
import axios from 'axios'

let URI_TO_ARTICLES = '/articles/:id'

export default {
    components: {AdifiaArticle},
    mounted() {
        const payload = {url: this.uriArticle}
        this.makeRequest(payload, 'get', this.setArticle.bind(this), this.logError.bind(this))
    },
    methods: {
        setArticle({article}) {
            this.article = article
            let title = 'Blog - ' + this.article.title
            this.$store.commit('context', {title, bar: ''})
            this.loaded = true
        },
        logError({errors}) {
            console.log(errors)
        }
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
