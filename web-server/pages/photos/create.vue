<template>
  <section>
      <h2>Subiendo una foto</h2>
      <img ref="imgPhoto" src="" alt="">
        <rsw-form :submitHandler="sendForm" submitText="Enviar foto" :errors="errors">
            <rsw-live-preview-image />
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

            let file = this.$refs.photo.files[0]
            fd.append('photo', file)

            axios.post(URI_PHOTO_CREATE, fd).then(response => {
                console.log('Petición hecha', response);
                
                console.log(title, email, address, file); 
            })
            
        },
        changeAvatar() {
            this.$refs.avatarImgInput.dispatchEvent(new MouseEvent('click'))
        },
        dispatchDrawImage(e) {
            const file = e.target.files[0]
            const imgTag = this.$refs.imgPhoto
            this.drawImage(imgTag, file)
        },
        drawImage(imgTag, file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                console.log('Dibujando imagen');
                
                imgTag.setAttribute('src', e.target.result);
            }

            reader.readAsDataURL(file);
        },
  }
}
</script>
