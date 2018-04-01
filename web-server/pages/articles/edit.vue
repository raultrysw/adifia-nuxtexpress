<template>
    <rsw-form v-if="show" :submitHandler="submitArticle" submitText="Enviar artículo" :errors="errors">
        <div class="main-start" v-if="isEvent">
            <div>google maps</div>
            <div>
                <rsw-field-group-input title="Información del evento">
                    <rsw-field-input text="Dia">
                        <input type="date" />
                    </rsw-field-input>
                    <rsw-field-input text="Hora">
                        <input type="time" />
                    </rsw-field-input>
                </rsw-field-group-input>
            </div>
        </div>
        <rsw-field-group-input title="Título del artículo">
            <rsw-field-input :value="title" v-model="title" description="Pon el título del artículo" />
        </rsw-field-group-input>
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
import rswFieldGroupInput from 'rsw-vue-components/components/RSWFieldGroupInput.vue'

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
    components: {Editor, rswForm, rswFieldInput, rswFieldGroupInput},
    layout: 'default',
    data() {
        return {
            initmce: init,
            show: false,
            errors: [],
            isEvent: false
        }
    },
    created() {
        if (this.isVocal) {
            let id = this.$route.query.id
            let thereIsNoId = id === undefined

            

            let titlePage = 'Creación del artículo'
            if (thereIsNoId) {
                this.show= true
                this.$store.commit('context', {title: titlePage, bar: ''})
                this.restoreArticle(id || 'new')
            } else {
                axios.get(this.articleRecoveryURI).then(response => {
                    const {title, body} = response.data.article
                    titlePage = 'Editando el artículo `' + title + '`'
                    this.title = title
                    this.body = body
                    this.$store.commit('context', {title: titlePage, bar: ''})
                    this.show = true
                })
            }

        } else {
            this.$router.push('/')
        }
    },
    computed: {
        ...mapGetters({
            isVocal: 'sessions/isVocal'
        }),
        articleRecoveryURI() {
            return 'http://localhost:7000/api/articles/' + this.$route.query.id
        },
        title: {
            get() {return this.$store.state.articles.newArticle.title},
            set(value) {
                this.saveInLocal('title', value)
                this.$store.state.articles.newArticle.title = value
            },
        },
        body: {
            get() {return this.$store.state.articles.newArticle.body},
            set(value) {
                this.saveInLocal('body', value)
                this.$store.state.articles.newArticle.body = value
            },
        }
    },
    methods: {
        ...mapActions('articles', 'sendArticle'),
        saveInLocal(articleKey, value) {
            let localArticles = JSON.parse(localStorage.getItem('savedArticles'))
            let key = this.$route.query.id || 'new'
            localArticles[key][articleKey] = value
            localStorage.setItem('savedArticles', JSON.stringify(localArticles))
        },
        restoreArticle(id) {
            let localArticles = JSON.parse(localStorage.getItem('savedArticles'))
            let key = this.$route.query.id || 'new'
            let article = localArticles[key]
            this.title = article['title']
            this.body = article['body']
        },
        dropArticle(id) {
            let localArticles = JSON.parse(localStorage.getItem('savedArticles'))
            localArticles[id] = {}
            localStorage.setItem('savedArticles', JSON.stringify(localArticles))
        },
        submitArticle() {
            const cb = response => {
                let {doc, errors} = response.data
                debugger
                if (errors) this.errors = errors
                else {
                    console.log('Se creo el doc:', doc);
                    this.dropArticle(this.$route.query.id || 'new')
                    this.$router.push('/articles')
                }
            }
            
            let isNewPost = this.$route.query.id === undefined
            let payload = {cb}
            if (!isNewPost) payload.uri = this.articleRecoveryURI
            payload.method = isNewPost ? 'post' : 'put'
            
            this.$store._actions['articles/sendArticle'][0](payload)
        }
    }
}
</script>
