<template>
    <section v-if="showui">
        <img :src="avatarUrl" ref="avatarImg" @click="changeAvatar" width="200" height="400" />
        <input id="avatarUploader" type="file" ref="avatarImgInput" @change="pushImage" >
        <h2>Artículos</h2>
        <adifia-articles-management v-if="isVocal"  />
        <section v-else>
            <h3>Eeres socio</h3>
        </section>
        
    </section>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapState} from 'vuex'
import AdifiaArticlesManagement from '~/components/AdifiaArticlesManagement'

const MEMBERS_URI = 'http://localhost:7000/api/members/serv/avatar'

export default {
    components: {AdifiaArticlesManagement},
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
