<template>
    <rsw-form class="form-photo" :submitHandler="sendForm" submitText="Enviar foto"  :errors="errors">
        <div class="main-start form-photo__basic-data">
            <div class="form-photo__file">
                <h2>Haz click aquí para subir la foto</h2>
                <rsw-live-preview-image width="100%" height="15em" v-model="file" :defaultImg="photo" :atChange="updateImage" />
            </div>
            <div class="form-photo__data">
                <rsw-field-group-input title="información de contacto">
                    <rsw-field-input ref="emailField" description="Email de contacto" v-model="email" />
                </rsw-field-group-input>
                <rsw-field-group-input title="Información basica de la foto" vertical="true">
                    <rsw-field-input text="Titulo" description="Título de la foto" v-model="title" />
                    <label class="rsw-field">
                        <span>Descripción de la foto</span>
                        <textarea class="form-photo__description" placeholder="Descripción de la barrera" v-model="description" ></textarea>
                    </label>
                </rsw-field-group-input>
            </div>
        </div>
        <rsw-location-picker class="form-photo__location" height="18em" :lat="38.3459963" :lng="-0.4906855" v-model="location" hint="Busca aquí el lugar de la barrera" />
        <p v-if="location"><a :href="linkToMaps" target="_blank">Ver en google maps</a></p>
    </rsw-form>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'

import rswLivePreviewImage from 'rsw-vue-components/components/RSWLivePreviewImage.vue'
import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'
import rswFieldGroupInput from 'rsw-vue-components/components/RSWFieldGroupInput.vue'
import rswLocationPicker from 'rsw-vue-components/components/RSWLocationPicker.vue'

// lat 38.3459963, lng -0.4906855

const URI_PHOTO_CREATE = '/photos'
export default {
    components: {rswForm, rswFieldInput, rswLivePreviewImage, rswFieldGroupInput, rswLocationPicker},
  data() {
      return {
          title: '',
          email: '',
          description: '',
          file: null,
          errors: [],
          location: null,
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
      ...mapState('sessions', ['user']),
      linkToMaps() {
          let url = !this.location ? '#' : `https://www.google.com/maps/search/?api=1&query=${this.location.lat()},${this.location.lng()}`
          return url
      },
      locationExtracted() {
          let lat = this.location.lat();
          let lng = this.location.lng();

          return lat + ';' + lng
      }
  },
  methods: {
        sendForm(e) {
            if (e.keyCode === 13) {
                console.log('evitando recarga');
                
                return
            }
            const {Photo} = this.prototypes, email = (this.user && this.user.email) || email;
            const data = new Photo(this, email).toFData()
            this.makeRequest({url: URI_PHOTO_CREATE, data}, 'post',
                ({photo}) => {
                    console.log(photo)
                },
                ({errors}) => {
                    console.log(errors)
                }
            )
/*
            let fd = new FormData()
            fd.append('title', title)
            fd.append('email', )
            fd.append('address', address)
            fd.append('photo', this.file)
            fd.append('description', this.description)
            fd.append('location', this.locationExtracted)
            
            this.$http.post(URI_PHOTO_CREATE, fd).then(response => {
                this.$router.push('/photos')
            })*/
        },
        updateImage(file, img) {
            this.file = file
            this.photo = img
        }
  }
}
</script>