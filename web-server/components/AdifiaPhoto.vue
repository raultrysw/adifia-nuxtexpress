<template>
    <figure>
        <div>
            <h3>{{photo.title}}</h3>
            <img width="200px" height="300px" :src="srcPhoto" alt="">
        </div>
        <figcaption>
            <button v-if="!photo.valid && isAdmin" @click="makeValid">Hacer válido</button>
            <button :style="style" @click="likeThePhoto">Me gusta ({{likesCount}})</button>
        </figcaption>
    </figure>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
const URI_PHOTO_CREATE = 'http://localhost:7000/api/photos/:id'
const URI_PHOTO_POST_LIKE = 'http://localhost:7000/api/photos/:id/like'

export default {
  props: ['photo'],
  mounted() {
      debugger
  },
  methods: {
      ...mapMutations('sessions', ['likesUser']),
      ...mapActions(['saveToken']),
      likeThePhoto() {
          let req = axios.put(this.urlPutLikePhoto, {}, {headers: this.headers})
          console.log('peticion faabricada',req);
          req.then(response => {
              this.photo.likes = response.data.likesPhotos
              this.likesUser(response.data.likesUser)
              this.saveToken()
          })
      },
      makeValid() {
          const data = {valid: true}
          axios.put(this.urlPutPhoto, data, {headers: this.headers}).then(response => {
              console.log('validated');
              
          })
      }
  },
  computed: {
      ...mapGetters(['headers']),
      ...mapState('sessions', ['user']),
      ...mapGetters('sessions', ['isAdmin']),
      style() {
          let likeThePhoto = this.user && this.user.photos.indexOf(this.photo._id) !== -1
          let color = likeThePhoto ? 'blue' : 'black'
          return {color}
      },
      srcPhoto() {
          return 'http://localhost:7000/assets/img/photos/' + this.photo._id + '.jpg'
      },
      urlPutPhoto() {
          return URI_PHOTO_CREATE.replace(':id', this.photo._id)
      },
      urlPutLikePhoto() {
          return URI_PHOTO_POST_LIKE.replace(':id', this.photo._id)
      },
      likesCount() {
          return this.photo.likes.length
      }
  }
}
</script>
<style lang="scss">

</style>
