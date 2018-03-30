<template>
    <section v-if="showui">
        <rsw-live-preview-image width="100%" height="16em" :atChange="pushImage" />
        <h2>Artículos</h2>
        <adifia-articles-management v-if="isVocal" />
        <h2>Usuarios</h2>
        <adifia-memebers-management v-if="isAdmin" />
        <section v-else>
            <h3>Eeres socio</h3>
        </section>
    </section>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapState} from 'vuex'

import AdifiaArticlesManagement from '~/components/AdifiaArticlesManagement'
import AdifiaMemebersManagement from '~/components/AdifiaMembersManagement'

import rswLivePreviewImage from 'rsw-vue-components/components/RSWLivePreviewImage.vue'

const MEMBERS_URI = 'http://localhost:7000/api/members/serv/avatar'

export default {
    components: {AdifiaArticlesManagement, rswLivePreviewImage, AdifiaMemebersManagement},
    data() {
        return {
            showui: false,
            articles: [],
            reloadedFirstTime: false
        }
    },
    mounted() {
        if (!this.$store.state.sessions.logged) {
            return this.$router.push('/')
        }
        this.$store.commit('title', 'Tu página privada')
        this.showui = true
    },
    methods: {
        pushImage(file, cb) {
            let formData = new FormData()
            formData.append('avatar', file)
            debugger
            console.log('Enviando peticion');
            
            axios.put(MEMBERS_URI, formData, {headers: this.$store.getters.headers}).then(response => {
                console.log('respuestaa recibida', response);
                
                this.$store.state.sessions.user.avatar = true

                this.$store.dispatch('saveToken')
                cb()
            })
        },
        
    },
    computed: {
        ...mapState('sessions', ['user']),
        ...mapGetters('sessions', ['isVocal', 'isAdmin', 'avatarUrl']),
        ...mapGetters(['headers'])
    }
}
</script>
<style lang="scss">
#avatarUploader {
    display: none;
}
.articles-table {
    border-collapse: collapse;
    &__header {
        background: darkgrey;
        font-weight: bold;
        color: white;
        font-size: 1.3em;
    }
}
</style>
