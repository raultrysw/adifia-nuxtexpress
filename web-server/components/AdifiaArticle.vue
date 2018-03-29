<template>
    <figure class="article">
        <div>
            <h4 v-if="level < 2"><nuxt-link :to="'/articles/' + article._id">{{article.title}}</nuxt-link></h4>
            <div v-if="level > 1" v-html="article.body"></div>
        </div>
        <figcaption>
            <p>Escrito por <b>{{article.author.name}} {{article.author.surname}}</b></p>
        </figcaption>
    </figure>
</template>
<script>
import axios from 'axios'


export default {
    props: ['article', 'level'],
    computed: {
        
        
        
        headers() {
            return this.$store.getters.headers
        }
    }
}
</script>
<style lang="css">
.article {
    margin: 10px;
}
</style>
