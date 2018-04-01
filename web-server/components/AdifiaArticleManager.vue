<template>
    <tr :style="style">
        <td>{{article.title}}</td>
        <td>{{article.author.name}} {{article.author.surname}}</td>
        <td>{{estado}}</td>
        <td>{{creationDate}}</td>
        <td>
            <span>
                <font-awesome-icon v-if="isMine && !isPublished" @click="removeArticle" icon="times" />
                <font-awesome-icon v-if="isUnSuccess" @click="sendToModerate" icon="arrow-up" />
                <font-awesome-icon v-if="isAdmin && isModerating" @click="sendToPublish" icon="arrow-right" />
                <nuxt-link :to="uriArticleEdition"><font-awesome-icon icon="edit" /></nuxt-link>
            </span>
        </td>
    </tr>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

let states = ['draft', 'sended', 'published']
let estados = ['En borrador', 'Enviado', 'Publicado']
let colors = {
    draft: 'tomato',
    sended: 'yellowgreen',
    published: 'lightgrey'
}

const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const URI_TO_ARTICLE = 'http://localhost:7000/api/articles/:id'

export default {
  props: ['article'],
  computed: {
      ...mapGetters('sessions', ['isAdmin']),
      ...mapGetters(['headers']),
      estado() {
          return estados[this.article.state]
      },
      creationDate() {
          let d = new Date(this.article.createdAt);
          
          let day = d.getDate() 
          let month = d.getMonth()
          let year = d.getFullYear()
          
          return `${day} de ${months[month]} del ${year}`
      },
      style() {
          return {
              backgroundColor: colors[states[this.article.state]],
              color: this.article.state === 2 ? 'black' : 'white',
              fontWeight: this.article.state < 2 ? 'bold' : 'normal'
          }
      },
      isMine() {
            if (!this.$store.state.sessions.user) return false
            let idUserSession = this.$store.state.sessions.user._id
            let idAuthor = this.article.author._id
            return idUserSession == idAuthor
        },
      isUnSuccess() {
            return this.article.state === 0
        },
        isModerating() {
            return this.article.state === 1
        },
        isPublished() {
            return this.article.state === 2
        },
        uriArticle() {
            return URI_TO_ARTICLE.replace(':id', this.article._id)
        },
        uriArticleEdition() {
            let uri = '/articles/edit?id=' + this.article._id
            return uri
        },
  },
  methods: {
        removeArticle() {
            axios.delete(this.uriArticle, {headers:this.headers}).then(response => {
                this.$emit('change')
            })
        },
        sendToModerate() {
            axios.put(this.uriArticle, {state: 1}, {headers:this.headers}).then(response => {
                this.$emit('change')
            })
        },
        sendToPublish() {
            axios.put(this.uriArticle, {state: 2}, {headers:this.headers}).then(response => {
                this.$emit('change')
            })
        }
  }
}
</script>
