<template>
  <section>
      <h2>Subiendo una foto</h2>
      <img ref="imgPhoto" src="" alt="">
        <rsw-form :submitHandler="sendForm" submitText="Enviar foto"  :errors="errors">
            <rsw-live-preview-image height="15em" v-model="file" :defaultImg="photo" :atChange="updateImage" />
            <rsw-field-input text="Titulo" description="Título de la foto" v-model="title" />
            <rsw-field-group-input title="información de contacto">
                <rsw-field-input ref="emailField" description="Email de contacto" v-model="email" />
                <rsw-field-input description="Dirección de la barrera" v-model="address" />
            </rsw-field-group-input>
        </rsw-form>
  </section>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'

import rswLivePreviewImage from 'rsw-vue-components/components/RSWLivePreviewImage.vue'
import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'
import rswFieldGroupInput from 'rsw-vue-components/components/RSWFieldGroupInput.vue'

const URI_PHOTO_CREATE = '/photos'
export default {
    components: {rswForm, rswFieldInput, rswLivePreviewImage, rswFieldGroupInput},
  data() {
      return {
          title: '',
          email: '',
          address: '',
          file: null,
          errors: [],
          photo: 'http://localhost:7000/assets/img/default-picture-photo.jpeg'
      }
  },
  mounted() {
      this.$store.commit('context', {title: 'Subiendo una foto', bar: ''})
        if (this.user) {
            this.email = this.user.email
            this.$refs.emailField.$el.querySelector('input').disabled = true
        }
  },
  computed: {
      ...mapState('sessions', ['user'])
  },
  methods: {
        sendForm() {
            const {title, email, address} = this

            let fd = new FormData()
            fd.append('title', title)
            fd.append('email', (this.user && this.user.email) || email)
            fd.append('address', address)
            fd.append('photo', this.file)
            
            this.$http.post(URI_PHOTO_CREATE, fd).then(response => {
                this.$router.push('/photos')
            })
        },
        updateImage(file, img) {
            this.file = file
            this.photo = img
        }
  }
}
</script>
