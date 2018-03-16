<template>
  <section>
      <h2>Subiendo una foto</h2>
      <img ref="imgPhoto" src="" alt="">
      <form @submit.prevent="sendForm">
          <input ref="photo" type="file" @change="dispatchDrawImage">
            <label><span>Título de la foto</span><input v-model="title" type="text" name="title-photo"/></label>          
            <label><span>Email de contacto</span><input v-model="email" type="text" name="email-photo"/></label>          
            <label><span>Dirección de la barrera</span><input v-model="address" type="text" name="address-photo"/></label>
            <input type="submit" value="enviar foto">
      </form>
  </section>
</template>
<script>
import axios from 'axios'

const URI_PHOTO_CREATE = 'http://localhost:7000/api/photos'
export default {
  data() {
      return {
          title: '',
          email: '',
          address: ''
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
