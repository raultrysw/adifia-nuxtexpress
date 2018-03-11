<template lang="html">
  <v-flex class="article">
    <h1 class="headline" v-if="level < 2 || level === undefined">
      <nuxt-link :to="'/articles/' + id">{{article.title}}</nuxt-link>
    </h1>
    <div v-if="level > 0" v-html="article.content" class="article-extract"></div>
    <footer v-if="level > 1">
      <span v-if="article.author">
        Publicado por {{article.author.name}}
      </span>
      <div v-if="logged && user.role > 1">
        <nuxt-link class="btn" :to="'/articles/create?edit=' + id">Editar</nuxt-link>
        <nuxt-link class="btn" :to="'/articles/' + id + '/method?=delete'">Borrar</nuxt-link>
      </div>
    </footer>
  </v-flex>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ['article', 'level', 'id'],
  computed: {
    ...mapState(['logged', 'user'])
  },
  mounted () {
    if (this.level === 1) {
      debugger //eslint-disable-line
      let extractOfArticle = this.$el.querySelector('.article-extract')
      let content = extractOfArticle.textContent.replace(/\n/g, ' ').slice(0, 200) + '...'
      extractOfArticle.innerHTML = content
    }
  }
}
</script>

<style lang="css">
.article {
  & > footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
