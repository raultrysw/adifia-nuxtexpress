import logFactory from '../../utils/log'
import Member from '../members/model'
import Article from './model'
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
    let {email} = req.user
    
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


/**
 * Si es vocal ver articulos propios
 * Si es dministror ver artículos propios o con estado a uno
 */
export function retrieve(req, res, next) {
    let query = Article.find()
    query.populate('author', ['name', 'surname', 'email', 'rol'])

    let user = req.user
    
    let retrieveAll = req.query.all
    if (retrieveAll && user) {
        let isAdmin = user.pvLvl >= 2
        let isVocal = user.pvLvl >= 1

        if (isVocal) {
            console.log('vocal');
            
            if (isAdmin) query.where('state').or([{author: user._id}, {state: {$gte: 1}}])
            else query.where('author').equals(user._id)
        }
    } else query.where('state').equals(2)
    

    query.sort({'createdAt': -1})
            .exec((err, articles) => {
        res.status(200)
        if (err) {
            console.log(err);
            
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

    let user = req.user
    let noHeaders = !user
    let notIsAuthorized = !noHeaders && user.pvLvl < 2;

    if (noHeaders && notIsAuthorized) {
        res.status(403)
        res.locals = {status: 'bad'}
        return next()
    }

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
    
    let user = req.user
    let notIsAuthorized = !user && req.heders.pvLvl < 2;
    if (user && notIsAuthorized) {
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