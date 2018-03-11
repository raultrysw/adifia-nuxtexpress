<template>
    <section v-if="showui">
        <img :src="avatarUrl" ref="avatarImg" @click="changeAvatar" width="200" height="400" />
        <input id="avatarUploader" type="file" ref="avatarImgInput" @change="pushImage" >
        <div class="">
            <section v-if="isAdmin && articlesUnpublished.length" >
                <h3>Listado de artículos para moderar</h3>
                <adifia-article level="0" v-for="(article, index) in articlesUnpublished" :key="index" @change="reloadChanges" :article="article"  />
            </section>
            <section v-if="isVocal && mineArticles.length">
                <h3>Lista de artículos que escribiste</h3>
                <adifia-article level="0" v-for="(article, index) in mineArticles" :key="index" :article="article" @change="reloadChanges" />
            </section>
            <section v-else>
                <h3>Eeres socio</h3>
            </section>
        </div>
        
    </section>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapState} from 'vuex'
import AdifiaArticle from '~/components/AdifiaArticle'

const ARTICLES_URI = 'http://localhost:7000/api/articles'
const MEMBERS_URI = 'http://localhost:7000/api/members/serv/avatar'

const URI_TO_UNPUBLISHED_ARTICLES = 'http://localhost:7000/api/articles/serv/unpublished'
const URI_TO_MINE_ARTICLES = 'http://localhost:7000/api/articles/serv/mine'

export default {
    components: {AdifiaArticle},
    data() {
        return {
            showui: false,
            articlesUnpublished: [],
            mineArticles: []
        }
    },
    mounted() {
        if (!this.$store.state.sessions.logged) {
            return this.$router.push('/')
        }
        this.$store.commit('title', 'Tu página privada')
        
        this.reloadChanges.bind(this)(() => {
            this.showui = true
        })
    },
    methods: {
        changeAvatar() {
            this.$refs.avatarImgInput.dispatchEvent(new MouseEvent('click'))
        },
        drawImage(imgTag, file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                imgTag.setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(file);
        },
        pushImage(e) {
            let file = e.target.files[0]
            let formData = new FormData()
            formData.append('avatar', file)
            console.log('Enviando peticion');
            
            axios.put(MEMBERS_URI, formData, {headers: this.$store.getters.headers}).then(response => {
                console.log('respuestaa recibida');
                
                this.$store.state.sessions.user.avatar = true

                this.$store.dispatch('saveToken')
                this.drawImage(this.$refs.avatarImg, file)
            })
        },
        reloadChanges(cb) {
            console.log('republicando');
            
            Promise.all(this.reqs).then(responses => {
                debugger
                if (this.isVocal) this.mineArticles = responses[0].data.articles
                if (this.isAdmin) this.articlesUnpublished = responses[1].data.articles
                this.showui = true
            })
        }
    },
    computed: {
        ...mapState('sessions', ['user']),
        ...mapGetters('sessions', ['isVocal', 'isAdmin', 'avatarUrl']),
        reqs() {
            let {isVocal, isAdmin} = this
            let reqs = []

            let headers = this.$store.getters.headers

            if (isVocal) reqs.push(axios.get(URI_TO_MINE_ARTICLES, {headers}))
            if (isAdmin) reqs.push(axios.get(URI_TO_UNPUBLISHED_ARTICLES, {headers}))

            return reqs
        }
    }
}
</script>
<style lang="scss">
#avatarUploader {
    display: none;
}
</style>
