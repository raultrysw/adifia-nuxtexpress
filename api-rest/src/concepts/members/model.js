import logFactory from '../../utils/log'
import {encrypt, comparePassword} from '../../utils/users'

const {ROLS} = require('../../../../settings')
const mongoose = require('mongoose')
const log = logFactory('MEMBERS MODEL')

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre no debe de estar vacío']
    },
    surname: {
        type: String,
        required: [true, 'Los apellidos no deben de estar vacios']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico no debe estar vacío'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligada'],
        set: encrypt
    },
    avatar: {
        type: Boolean,
        default: false
    },
    pvLvl: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        default: 0
    },
    articles: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'}
    ]
})

class MemberClass {
    static compareUserAndPass({email, password}, cb) {
        log('debug', `DecryptedPassword ${password}`)


        this.findOne({email}, (err, doc) => {
            if (doc == null) log('debug', 'Usuario no encontrado')
            if (doc === null || err) cb(err, doc)
            else comparePassword(password, doc.password, (err, result) => {
                cb(err, doc, result)
            })
        })
    }
    static pushArticle(article, user) {
        user.articles.push(article)
        user.save()
    }
    static removeArticle(userId, articleId) {
        this.findById(userId, (err, user) => {
            let index = user.articles.indexOf(articleId)
            user.articles.splice(index, 1)
            user.save()
        })
    }
}

schema.loadClass(MemberClass)

let membersModel = mongoose.model('Member', schema)
log('debug', 'Modelo members creado')

export default membersModel

/* USUARIOS:
    email: romateo@gmail.com
    password: silly
    pvLvl: 0
*/