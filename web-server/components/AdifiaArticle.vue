<template>
    <figure class="article">
        <div>
            <h4 v-if="level < 2"><nuxt-link :to="'/articles/' + article._id">{{article.title}}</nuxt-link></h4>
            <div v-if="level > 1" v-html="article.body"></div>
        </div>
        <figcaption>
            <p>Escrito por <b>{{article.author.name}} {{article.author.surname}}</b></p>
            <div v-if="isAdmin || isMine">
                <font-awesome-icon v-if="!isPublished" @click="removeArticle" icon="times" />
                <font-awesome-icon v-if="isUnSuccess" @click="sendToModerate" icon="arrow-right" />
                <font-awesome-icon v-if="isAdmin && isModerating" @click="sendToPublish" icon="arrow-right" />
            </div>
        </figcaption>
    </figure>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

const URI_TO_ARTICLE = 'http://localhost:7000/api/articles/:id'

export default {
    props: ['article', 'level'],
    computed: {
        ...mapGetters('sessions', ['isAdmin']),
        isUnSuccess() {
            return this.article.state === 0
        },
        isModerating() {
            return this.article.state === 1
        },
        isPublished() {
            return this.article.state === 2
        },
        isMine() {
            if (!this.$store.state.sessions.user) return false
            let idUserSession = this.$store.state.sessions.user._id
            let idAuthor = this.article.author._id
            return idUserSession == idAuthor
        },
        uriArticle() {
            return URI_TO_ARTICLE.replace(':id', this.article._id)
        },
        headers() {
            return this.$store.getters.headers
        }
    },
    methods: {
        removeArticle() {
            axios.delete(this.uriArticle, {headers:this.headers}).then(response => {
                this.$emit('change')
            })
        },
        sendToModerate() {
            axios.put(this.uriArticle, {state: 1}, {headers:this.headers}).then(response => {
                console.log('moderating');
                
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
