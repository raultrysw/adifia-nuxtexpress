<template>
  <section>
      <h2>Foto denuncia</h2>
      <main class="grid-container grid-2345">
          <figure v-for="(photo, index) in photos" :key="index" is="adifia-photo" :photo="photo"></figure>
      </main>
      <footer>
          <nuxt-link to="/photos/create">Subir una foto</nuxt-link>
      </footer>
  </section>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import AdifiaPhoto from '~/components/AdifiaPhoto.vue'

const URI_PHOTO_CREATE = 'http://localhost:7000/api/photos'

export default {
    components: {AdifiaPhoto},
    data() {
        return {
            photos: []
        }
    },
    created() {
        this.$store.commit('title', 'Foto denuncia')
        const {headers} = this
        axios.get(URI_PHOTO_CREATE,{headers}).then(response => {
            this.photos = response.data.docs
        })
    },
    computed: {
        ...mapGetters(['headers'])
    }
}
</script>
<style lang="scss">

</style>
