<template>
    <form @submit.prevent="submitArticle">
        <div>
            <label><span>Título del artículo</span><input v-model="title" type="text" name="title-article"/></label>
        </div>
        <editor :init="initmce" v-model="body" />
        <p><input type="submit" value="Crear artículo"></p>
    </form>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import {mapActions} from 'vuex';
import axios from 'axios'

const URI_TO_UPLOAD_ARTICLES_IMAGES = 'http://localhost:7000/api/articles/serv/uploadimage'

const init = {
    toolbar: ['insertimage'],
    setup: editor => {
        function insertImage(response) {
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
    data() {
        return {
            initmce: init
        }
    },
    created() {
        this.$store.commit('title', 'Creación de artículo')
    },
    computed: {
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
                let {doc} = response.data
                console.log('Se creo el doc:', doc);
                this.$router.push('/articles')
            })
        }
    },
    components: {Editor}
}
</script>
