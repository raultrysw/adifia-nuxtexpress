import logFactory from '../../utils/log'
import Member from '../members/model'

const mongoose = require('mongoose')
const log = logFactory('MEMBERS MODEL')

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    body: {
        type: String,
        required: [true, 'El cuerpo es obligatorio']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }
})

class ArticleClass {

}

schema.loadClass(ArticleClass)

let articlesModel = mongoose.model('Article', schema)
log('debug', 'Modelo article creado')

export default articlesModel