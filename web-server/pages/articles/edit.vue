<template>
    <rsw-form class="form-article" v-if="show" :submitHandler="submitArticle" submitText="Enviar artículo" :errors="errors">
        <rsw-field-group-input class="form-article__title" title="Título del artículo">
            <rsw-field-input :value="title" v-model="title" description="Pon el título del artículo" />
        </rsw-field-group-input>
        <editor class="form-article__body" :init="initmce" v-model="body" />
        <rsw-toggle-input :state="isEvent" v-model="isEvent">Es un evento</rsw-toggle-input>
        <div v-if="isEvent" class="form-article-event form-article-event__zone">
            <h2>Información del evento</h2>
            <div class="main-start">
                <div class="form-article-event__location">
                    <rsw-location-picker height="10em" :lat="lat" :lng="lng" :text="text" v-model="location" title="Lugar del evento" />
                </div>
                <div class="form-article-event__date-time">
                    <rsw-field-group-input title="Datos básicos del evento" vertical="true">
                        <rsw-field-input class="form-article-event__date" text="Dia">
                            <input v-model="date" type="date" />
                        </rsw-field-input>
                        <rsw-field-input class="form-article-event__time" text="Hora">
                            <input  v-model="time" type="time" />
                        </rsw-field-input>
                    </rsw-field-group-input>
                </div>
            </div>
            <rsw-field-input class="form-article-event__story" text="story">
                <textarea class="form-article-event__story-frame" v-model="story"></textarea>
            </rsw-field-input>
        </div>
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
            isEvent: false,
            time: '',
            date: '',
            story: '',
            location: '',
            lat: 38.3459963,
            lng: -0.4906855,
            text: ''
        }
    },
    created() {
        if (this.isVocal) {
            let id = this.$route.query.id
            let thereIsNoId = id === undefined

            this.makeRequest('/articles')

            let titlePage = 'Creación del artículo'
            if (thereIsNoId) {
                this.show= true
                this.$store.commit('context', {title: titlePage, bar: ''})
                this.restoreArticle(id || 'new')
            } else {
                this.axios.get(this.articleRecoveryURI).then(response => {
                    const {title, body, isEvent, time, date, story, location} = response.data.article
                    titlePage = 'Editando el artículo `' + title + '`'
                    this.locationEvent = location
                    this.setLocation()
                    this.title = title
                    this.body = body
                    this.$store.commit('context', {title: titlePage, bar: ''})
                    this.isEvent = isEvent
                    this.time = time
                    this.date = date
                    this.story = story
                    this.show = true
                })
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
        title: {
            get() {return this.$store.state.articles.newArticle.title},
            set(value) {
                if (!this.$route.query.id) this.saveInLocal('title', value)
                this.$store.state.articles.newArticle.title = value
            },
        },
        body: {
            get() {return this.$store.state.articles.newArticle.body},
            set(value) {
                if (!this.$route.query.id) this.saveInLocal('body', value)
                this.$store.state.articles.newArticle.body = value
            },
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
        dropArticle(id) {
            let localArticles = JSON.parse(localStorage.getItem('savedArticles'))
            localArticles[id] = {}
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
            const cb = response => {
                let {doc, errors} = response.data
                if (errors) this.errors = errors
                else {
                    this.dropArticle(this.$route.query.id || 'new')
                    this.$router.push('/articles')
                    this.title = ''
                    this.body = ''
                }
            }
            let isNewPost = this.$route.query.id === undefined
            let uri = isNewPost ? URI_TO_POST_ARTICLES : this.articleRecoveryURI
            let method = isNewPost ? 'post' : 'put'
            let newArticle = {
                title: this.title,
                body: this.body,
                isEvent: this.isEvent
            }
            if (this.isEvent) {
                newArticle['time'] = this.time
                newArticle['date'] = this.date
                newArticle['story'] = this.story
                newArticle['location'] = this.locationExtracted
            }
            let options = {headers: this.headers}

            this.$http[method](uri, newArticle, options).then(cb)
        }
    }
}
</script>
