import logFactory from '../../utils/log'
import Member from '../members/model'
import Article from './model'
import {decodifyToken} from '../../utils/userSessions'
import {getMongoDocumentErrors} from '../../utils/controllerUtils'


const log = logFactory('ARTICLES CONTROLLER')

export function get(req, res, next) {
    Article.findById(req.params.id).populate('author', 'name surname').exec((err, article) => {
        res.status(200)
        if (err) {
            res.locals.errors = err
            next()
        } else {
            res.locals = {
                status: 'ok',
                article
            }
            next()
        }
    })
}

export function create(req, res, next) {
    let token = req.headers['jwt-user-token'];
    let userWritingPayload = decodifyToken(token)

    let {email} = userWritingPayload
    
    const {title, body} = req.body
    let article = new Article({title, body})

    Member.findOne({email}, (err, userWriting) => {
        article.author = userWriting

        article.save((err, doc) => {
            res.status(200)
            if (err) {
                log('debug', `Hay ${Object.keys(err.errors).length} error en el documento de member`)
                res.locals.errors = getMongoDocumentErrors(err);
                next()
            } else {
                res.locals = {
                    status: 'ok',
                    doc: article._id
                }
                Member.pushArticle(article, userWriting)
                next()
            }
        })
    })
    
}

export function retrieve(req, res, next) {
    Article.find({state: 2}).sort({'createdAt': -1})
            .populate('author', ['name', 'surname', 'rol'])
            .exec((err, articles) => {
        res.status(200)
        if (err) {
            res.locals.errors = err
            return next()
        }
        res.locals = {
            status: 'ok', articles
        }
        next();
    })
}

export function update(req, res, next) {
    let $set = req.body
    Article.findByIdAndUpdate(req.params.id, {$set}, (err, doc) => {
        res.status(200)
        if (err) {
            res.locals.errors = err
            return next()
        }
        res.locals = {
            status: 'ok', doc
        }
        next()
    })
}

export function destroy(req, res, next) {
    log('debug', 'Eliminando un artículo')
    console.log(req.headers);
    
    if (req.headers['jwt-user-token'] === undefined) {
        res.status(403)
        res.locals = {status: 'bad'}
        return next()
    }
    Article.findByIdAndRemove(req.params.id, (err, doc) => {
        res.status(200)
        if (err) {
            res.locals.errors = err
            return next()
        }
        Member.removeArticle(doc.author, doc._id)
        res.locals = {
            status: 'ok', doc
        }
        next()
    })
}