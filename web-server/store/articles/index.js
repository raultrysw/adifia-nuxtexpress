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

const actions = {
    getArticles({}, cb) {
        axios.get(URI_TO_ARTICLES_RECOVERY).then(cb)
    },
    sendArticle({rootGetters, state}, {uri, method, cb}) {
        let {headers} = rootGetters
        let article = state.newArticle
        let uriToPoint = uri || URI_TO_ARTICLES_CREATION

        axios[method](uriToPoint, article, {
            headers: rootGetters.headers
        }).then((response) => {
            state.newArticle.title = ''
            state.newArticle.body = ''
            cb(response)
        })
    }
}

export default {namespaced, actions, state}