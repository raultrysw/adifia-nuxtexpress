import logFactory from '../../utils/log'
import Member from '../members/model'
import Article from './model'
import {pipe} from '../../utils/pipeObjects'
import {getMongoDocumentErrors} from '../../utils/controllerUtils'
import {filterFor} from './query-builder'


const log = logFactory('ARTICLES CONTROLLER')

export function get(req, res, next) {
    Article.findById(req.params.id).populate('author', 'name surname').exec((err, article) => {
        if (err) {
            let response = req.createBadResponse(500, 'Hubo un error interno')
            next(response)
        }
        else {
            res.locals = req.createGoodResponse(200, 'Artículo recuperado', {article})
            next()
        }
    })
}

export function create(req, res, next) {
    let {email} = req.user
    
    let article = new Article(req.body)

    Member.findOne({email}, (err, userWriting) => {
        article.author = userWriting

        article.save((err, doc) => {
            res.status(200)
            if (err) {
                let message = `Hay ${Object.keys(err.errors).length} error en el documento de member`
                log('debug', message)
                res.locals.errors = getMongoDocumentErrors(err);
                let response = req.createBadResponse(209, message, {})
                next(response)
            } else {
                res.locals = createGoodResponse(201, 'El artículo fue creado correctamente', {articleId: article._id})
                Member.pushArticle(article, userWriting)
                next()
            }
        })
    })
}

/**
 * Si es vocal ver articulos propios
 * Si es dministror ver artículos propios o con estado a uno
 */

export function retrieve(req, res, next) {
    let query = filterFor(req)
    query.populate('author', ['name', 'surname', 'email', 'rol'])
    query.sort({'createdAt': -1})
    query.exec((err, articles) => {
        res.status(200)
        if (err) {
            let response = req.createBadResponse(500, 'Ha habido un error interno', {})
            res.locals.errors = err
            return next(response)
        }
        res.locals = req.createGoodResponse(200, 'Todos los artículos fueron recuperados', {articles})
        next();
    })
}

export function update(req, res, next) {
    let $set = req.body

    let user = req.user
    let noHeaders = !user
    let notIsAuthorized = !noHeaders && user.pvLvl < 2;

    if (noHeaders && notIsAuthorized) {
        let response = req.createBadResponse(403, 'Se necesita autorización paaraa realizar esta acción')
        return next(response)
    }

    Article.findByIdAndUpdate(req.params.id, {$set}, (err, article) => {
        if (err) {
            let response = req.createBadResponse(500, 'Hubo un error interno')
            return next(response)
        }
        res.locals = req.createGoodResponse(210, 'El artículo fue actualizado correctamente', {article})
        next()
    })
}

export function destroy(req, res, next) {
    log('debug', 'Eliminando un artículo')
    
    let user = req.user
    let notIsAuthorized = !user && req.heders.pvLvl < 2;
    if (user && notIsAuthorized) {
        let response = req.createBadResponse(403, 'Se necesita autorización paaraa realizar esta acción')
        return next(response)
    }
    Article.findByIdAndRemove(req.params.id, (err, doc) => {
        res.status(200)
        if (err) {
            let response = req.createBadResponse(500, 'Hubo un error interno')
            return next(response)
        }
        Member.removeArticle(doc.author, doc._id)
        res.locals = req.createGoodResponse(211, 'El artículo fue eliminado correctamente')
        next()
    })
}