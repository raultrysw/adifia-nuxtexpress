<template>
  <section>
      <h2>Subiendo una foto</h2>
      <img ref="imgPhoto" src="" alt="">
        <rsw-form :submitHandler="sendForm" submitText="Enviar foto"  :errors="errors">
            <rsw-live-preview-image height="15em" v-model="file" :atChange="updateImage" />
            <rsw-field-input text="Titulo" description="Título de la foto" v-model="title" />
            <rsw-field-input text="Email" description="Email de contacto" v-model="email" />
            <rsw-field-input text="Dirección" description="Dirección de la barrera" v-model="address" />
        </rsw-form>
  </section>
</template>
<script>
import axios from 'axios'
import rswLivePreviewImage from 'rsw-vue-components/components/RSWLivePreviewImage.vue'
import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'

const URI_PHOTO_CREATE = 'http://localhost:7000/api/photos'
export default {
    components: {rswForm, rswFieldInput, rswLivePreviewImage},
  data() {
      return {
          title: '',
          email: '',
          address: '',
          file: null,
          errors: []
      }
  },
  methods: {
        sendForm() {
            const {title, email, address} = this

            let fd = new FormData()
            fd.append('title', title)
            fd.append('email', email)
            fd.append('address', address)
            fd.append('photo', this.file)

            debugger

            axios.post(URI_PHOTO_CREATE, fd).then(response => {
                console.log('Petición hecha', response);
                
                console.log(title, email, address, this.file); 
                this.$router.push('/photos')
            })
            
        },
        updateImage(file, cb) {
            this.file = file
            cb()
        }
  }
}
</script>
