<template>
    <rsw-form :submitHandler="submitArticle" submitText="Enviar artículo" :errors="errors">
        <rsw-field-input text="Título del artículo" v-model="title" description="Pon el título del artículo" />
        <editor :init="initmce" v-model="body" />
    </rsw-form>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import {mapActions, mapGetters} from 'vuex';
import axios from 'axios'

const URI_TO_UPLOAD_ARTICLES_IMAGES = 'http://localhost:7000/api/articles/serv/uploadimage'

import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'

const init = {
    toolbar: ['insertimage'],
    setup: editor => {
        function insertImage(response) {
            debugger
            let imgTag = '<img src="' + response.data.url + '" />'
            editor.insertContent(imgTag)
        }


        editor.addButton('insertimage', {
            text: 'Insertar imagen',
            onclick: () => {
                

                const input = document.createElement('input')
                input.type = 'file'
                
                input.dispatchEvent(new MouseEvent('click'))
                input.onchange = function(e) {
                    let file = e.target.files[0]
                    
                    let formData = new FormData()
                    formData.append('image', file)

                    axios.post(URI_TO_UPLOAD_ARTICLES_IMAGES, formData).then(insertImage)
                }
            }
        })
    } 
}

export default {
    components: {Editor, rswForm, rswFieldInput},
    data() {
        return {
            initmce: init,
            show: false,
            errors: []
        }
    },
    created() {
        if (this.isVocal) {
            this.$store.commit('title', 'Creación de artículo')
            this.show = true;
        } else {
            this.$router.push('/')
        }
    },
    computed: {
        ...mapGetters({
            isVocal: 'sessions/isVocal'
        }),
        title: {
            get() {return this.$store.state.articles.newArticle.title},
            set(value) {this.$store.state.articles.newArticle.title = value},
        },
        body: {
            get() {return this.$store.state.articles.newArticle.body},
            set(value) {this.$store.state.articles.newArticle.body = value},
        }
    },
    methods: {
        ...mapActions('articles', 'sendArticle'),
        submitArticle() {
            this.$store._actions['articles/sendArticle'][0](response => {
                let {doc, errors} = response.data
                debugger
                if (errors) this.errors = errors
                else {
                    console.log('Se creo el doc:', doc);
                    this.$router.push('/articles')
                }
            })
        }
    }
}
</script>
