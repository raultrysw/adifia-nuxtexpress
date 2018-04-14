<template>
    <rsw-form class="form-article" v-if="show" :submitHandler="submitArticle" submitText="Enviar artículo" :errors="errors">
        <rsw-field-group-input class="form-article__title" title="Título del artículo">
            <rsw-field-input :value="title" v-model="article.title" description="Pon el título del artículo" />
        </rsw-field-group-input>
        <editor class="form-article__body" :init="initmce" v-model="article.body" />
        <rsw-toggle-input :state="article.isEvent" v-model="article.isEvent">Es un evento</rsw-toggle-input>
        <transition name="slideInDown">
            <div v-if="article.isEvent" class="form-article-event form-article-event__zone">
                <h2>Información del evento</h2>
                <div class="main-start">
                    <div class="form-article-event__location">
                        <rsw-location-picker height="10em" :lat="article.lat" :lng="article.lng" :text="text" v-model="article.location" title="Lugar del evento" />
                    </div>
                    <div class="form-article-event__date-time">
                        <rsw-field-group-input title="Datos básicos del evento" vertical="true">
                            <rsw-field-input class="form-article-event__date" text="Dia">
                                <input v-model="article.date" type="date" />
                            </rsw-field-input>
                            <rsw-field-input class="form-article-event__time" text="Hora">
                                <input  v-model="article.time" type="time" />
                            </rsw-field-input>
                        </rsw-field-group-input>
                    </div>
                </div>
                <rsw-field-input class="form-article-event__story" text="story">
                    <textarea class="form-article-event__story-frame" v-model="article.story"></textarea>
                </rsw-field-input>
            </div>
        </transition>
    </rsw-form>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import {mapActions, mapGetters} from 'vuex';

const URI_TO_UPLOAD_ARTICLES_IMAGES = '/articles/serv/uploadimage'
const URI_TO_POST_ARTICLES = '/articles/'

import rswForm from 'rsw-vue-components/components/RSWForm.vue'
import rswFieldInput from 'rsw-vue-components/components/RSWFieldInput.vue'
import rswFieldGroupInput from 'rsw-vue-components/components/RSWFieldGroupInput.vue'
import rswLocationPicker from 'rsw-vue-components/components/RSWLocationPicker.vue'
import rswToggleInput from 'rsw-vue-components/components/RSWToggleInput.vue'

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
    components: {Editor, rswForm, rswFieldInput, rswFieldGroupInput, rswLocationPicker, rswToggleInput},
    layout: 'default',
    data() {
        return {
            initmce: init,
            show: false,
            errors: [],
            text: '',
            lat: 38.3459963,
            lng: -0.4906855,
            article: {
                isEvent: false,
                title: '',
                body: '',
                time: '',
                date: '',
                story: '',
                location: '',
            }
        }
    },
    created() {
        if (this.isVocal) {
            let id = this.$route.query.id
            let thereIsNoId = id === undefined

            // this.makeRequest('/articles')

            const {DiaryPage} = this.prototypes

            let titlePage = 'Creación del artículo'
            if (thereIsNoId) {
                this.show= true
                this.$store.commit('context', {title: titlePage, bar: ''})
                this.restoreArticle(id || 'new')
            } else {
                this.makeRequest({url: this.articleRecoveryURI}, 'get',
                    ({article}) => {
                        console.log('Articulo recuperado', article);
                        this.article = new DiaryPage(article)
                        this.show = true
                        titlePage = 'Editando el artículo `' + article.title + '`'
                        this.$store.commit('context', {title: titlePage, bar: ''})
                    },
                    ({errors}) => {
                        console.log('Han habido varios errores')
                    }
                    )
            }

        } else {
            this.$router.push('/')
        }
    },
    computed: {
        ...mapGetters({
            isVocal: 'sessions/isVocal',
            headers: 'headers'
        }),
        locationExtracted() {
            const {lat, lng, placeDescription} = this.location
            
            const latitud = typeof lat === 'number' ? lat : lat()
            const longitud = typeof lng === 'number' ? lng : lng()
            
            return latitud + ';' + longitud + ';' + placeDescription
        },
        articleRecoveryURI() {
            return '/articles/' + this.$route.query.id
        },
        uriToThisArticle() {
            let isNewPost = this.$route.query.id === undefined,
                url = isNewPost ? URI_TO_POST_ARTICLES : this.articleRecoveryURI,
                method = isNewPost ? 'post' : 'put';
            return [url, method]
        },
        payload() {
            const {DiaryPage} = this.prototypes
            const [url, method] = this.uriToThisArticle, data = new DiaryPage(this.article),
                options = {headers: this.headers}
            const payload = {url, data, options}
            return [payload, method]
        }
    },
    methods: {
        ...mapActions('articles', 'sendArticle'),
        saveInLocal(articleKey, value) {
            let localArticles = JSON.parse(localStorage.getItem('savedArticles'))
            localArticles['new'][articleKey] = value
            localStorage.setItem('savedArticles', JSON.stringify(localArticles))
        },
        restoreArticle(id) {
            let localArticles = JSON.parse(localStorage.getItem('savedArticles'))
            let key = this.$route.query.id || 'new'
            let article = localArticles[key]
            this.title = article['title']
            this.body = article['body']
        },
        dropArticle() {
            let localArticles = JSON.parse(localStorage.getItem('savedArticles'))
            localArticles.new = {}
            localStorage.setItem('savedArticles', JSON.stringify(localArticles))
        },
        setLocation() {
            debugger
            let [lat, lng, text] = this.locationEvent.split(';')
            this.lat = Number(lat)
            this.lng = Number(lng)
            this.text = text
        },
        submitArticle() {
            const [payload, method] = this.payload
            debugger
            this.makeRequest(payload, method, this.redirect.bind(this), this.logErrors.bind(this))
        },
        redirect() {
            this.title = ''
            this.body = ''
            this.dropArticle()
            this.$router.push('/profile')
        },
        logErrors({errors}) {
            this.errors = errors
        }
    }
}
</script>
