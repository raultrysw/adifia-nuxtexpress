<template>
  <section>
      <h2>Foto denuncia <span v-if="showingAll">(Viendo todas las fotos)</span></h2>
      <main class="grid-container grid-2345">
          <figure v-for="(photo, index) in photos" :key="index" is="adifia-photo" :photo="photo"></figure>
      </main>
      <div class="fab-bar flex-column-reverse">
          <nuxt-link class="fab-bar__icon" to="/photos/create"><font-awesome-icon icon="arrow-up" /></nuxt-link>
      </div>
  </section>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapState} from 'vuex'
import AdifiaPhoto from '~/components/AdifiaPhoto.vue'
import rswToggleButton from 'rsw-vue-components/components/RSWToggleInput.vue'

const URI_PHOTO_CREATE = 'http://localhost:7000/api/photos'
const URI_PHOTO_RECOVERY = 'http://localhost:7000/api/photos'

export default {
    components: {AdifiaPhoto, rswToggleButton},
    data() {
        return {
            photos: []
        }
    },
    created() {
        this.$store.commit('context', {title:'Foto denuncia', bar: 'photo'})
        const {headers} = this
        axios.get(URI_PHOTO_RECOVERY).then(response => {
            this.photos = response.data.docs
        })
    },
    computed: {
        ...mapState('photos', ['viewAll']),
        ...mapGetters(['headers']),
        ...mapGetters('sessions', ['token', 'isAdmin']),
        showingAll() {
            let viewAll = this.$store._modules.root._children.photos.state.viewAll
            let URL = viewAll ? URI_PHOTO_RECOVERY + '?all=true&token=' + this.token : URI_PHOTO_RECOVERY
            console.log('URL:', URL);
            this.photos = []
            
            axios.get(URL).then(response => {
                this.photos = response.data.docs
            })

            return viewAll
        }
    }
}
</script>
<style lang="scss">

</style>
