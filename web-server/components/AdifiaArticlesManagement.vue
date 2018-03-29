<template>
  <table v-if="showui" class="articles-table">
            <thead class="articles-table__header">
                <th>Título del artículo</th>
                <th>Escritor</th>
                <th>Estado</th>
                <th>Fecha de creación</th>
                <th v-if="isAdmin && !allArePublished">Operaciones</th>
            </thead>
            <tbody>
                <tr @change="reloadChanges" v-for="(article, index)  in articles" :key="index" :article="article" is="adifia-article-manager"></tr>
            </tbody>
        </table>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import axios from 'axios'
import AdifiaArticleManager from '~/components/AdifiaArticleManager'

export default {
    components: {AdifiaArticleManager},
    data() {
        return {
            articles: [],
            showui: false
        }
    },
    mounted() {
        this.reloadChanges.bind(this)(() => {
            this.showui = true
        })
    },
  methods: {
      reloadChanges(cb) {
            axios.get(this.ARTICLES_URI).then(response => {
                this.articles = []
                this.articles = response.data.articles
                cb();
            })
        }
  },
  computed: {
        ...mapGetters('sessions', ['isVocal', 'isAdmin']),    
        ...mapGetters(['headers']),          
      ARTICLES_URI() {
            return 'http://localhost:7000/api/articles?all=true&token=' + this.headers['jwt-user-token']
        },
        allArePublished() {
            let articlesPublished = this.articles.filter(article => article.state === 2)
            console.log(articlesPublished, this.articles)
            return articlesPublished.length === this.articles.length
        }
  }
}
</script>
