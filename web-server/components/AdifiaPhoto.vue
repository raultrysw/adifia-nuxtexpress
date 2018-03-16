<template>
    <figure>
        <div>
            <h3>{{photo.title}}</h3>
            <img width="200px" height="300px" :src="srcPhoto" alt="">
        </div>
        <figcaption>
            <button @click="makeValid">Hacer válido</button>
        </figcaption>
    </figure>
</template>
<script>
import axios from 'axios'
const URI_PHOTO_CREATE = 'http://localhost:7000/api/photos/:id'

export default {
  props: ['photo'],
  methods: {
      makeValid() {
          const data = {valid: true}
          axios.put(this.urlPutPhoto, data).then(response => {
              console.log('validated');
              
          })
      }
  },
  computed: {
      srcPhoto() {
          return 'http://localhost:7000/assets/img/photos/' + this.photo._id + '.jpg'
      },
      urlPutPhoto() {
          return URI_PHOTO_CREATE.replace(':id', this.photo._id)
      }
  }
}
</script>
<style lang="scss">

</style>
