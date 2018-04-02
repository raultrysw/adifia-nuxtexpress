import axios from 'axios'
const namespaced = true

const URI_TO_ARTICLES_CREATION = 'http://localhost:7000/api/articles'
const URI_TO_ARTICLES_RECOVERY = 'http://localhost:7000/api/articles'

const state = {
    newArticle: {
        title: '',
        body: ''
    }
}

export default {namespaced, state}