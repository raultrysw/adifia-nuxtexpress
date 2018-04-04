<template>
  <div>
      <table v-if="showui" class="articles-table">
            <thead class="articles-table__header">
                <th>Título del artículo</th>
                <th>Escritor</th>
                <th>Estado</th>
                <th>Fecha de creación</th>
                <th>Operaciones</th>
            </thead>
            <tbody>
                <tr @change="reloadChanges" v-for="(article, index)  in articles" :key="index"
                    @remove="openConfirmRemoveArticle"
                    :indexOfArticle="index"
                    :article="article"
                    is="adifia-article-manager"></tr>
            </tbody>
        </table>
        <rsw-modal @close="() => articleToRemove = -1" v-if="articles.length > 0 && articleToRemove >= 0" title="Ponga el título del artículo si quiere eliminar el artículo">
            <div>
                <p>El título del artículo es <strong>{{articles[articleToRemove].title}}</strong></p>
            </div>
            <rsw-field-input description="Pon el título del artículo" v-model="titleArticleToRemove" />
            <input type="submit" @click="removeArticle" value="Eliminar">
        </rsw-modal>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import AdifiaArticleManager from '~/components/AdifiaArticleManager'
import rswModal from 'rsw-vue-components/components/RSWModal.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'

export default {
    components: {AdifiaArticleManager, rswModal, rswFieldInput},
    data() {
        return {
            articles: [],
            showui: false,
            articleToRemove: -1,
            titleArticleToRemove: ''
        }
    },
    mounted() {
        this.reloadChanges.bind(this)(() => {
            this.showui = true
        })
    },
  methods: {
      openConfirmRemoveArticle(index) {
          this.articleToRemove = index
      },
      removeArticle() {
          let [confirmation, title] = [
              this.titleArticleToRemove,
              this.articles[this.articleToRemove].title
          ]
          let articleConfirmation = confirmation === title
          
          if (articleConfirmation) {
              console.log('Haciendo petición a', this.uriToArticleToRemove);
              
                this.$http.delete(this.uriToArticleToRemove, {headers:this.headers}).then(response => {
                    this.reloadChanges(() => this.articleToRemove = -1)
                })
          }
      },
      reloadChanges(cb) {
          this.articles = []
          this.$http.get(this.ARTICLES_URI).then(response => {
              this.articles = response.data.articles
              cb();
          })
        }
  },
  computed: {
        ...mapGetters('sessions', ['isVocal', 'isAdmin']),    
        ...mapGetters(['headers']),          
      ARTICLES_URI() {
            return '/articles?all=true&token=' + this.headers['jwt-user-token']
        },
        allArePublished() {
            let articlesPublished = this.articles.filter(article => article.state === 2)
            return articlesPublished.length === this.articles.length
        },
        uriToArticleToRemove() {
            const URI_TO_ARTICLE = '/articles/:id'
            return URI_TO_ARTICLE.replace(':id', this.articles[this.articleToRemove]._id)
        },
  }
}
</script>
