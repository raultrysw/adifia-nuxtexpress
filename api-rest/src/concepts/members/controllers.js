import logFactory from '../../utils/log'
import {getMongoDocumentErrors} from '../../utils/controllerUtils'
import Member from './model'

const DUPLICATE_ERROR_CODE = 11000

const log = logFactory('MEMBERS CONTROLLER')

export function create(req, res, next) {
    const {name, surname, email, password} = req.body
    log('debug', 'Creando el usuario: ' + email)
    const member = new Member({name, surname, email, password})
    member.save(member, (err, doc) => {
        res.status(200)
        if (err) {
            let isDuplicated = err.code === DUPLICATE_ERROR_CODE

            if (isDuplicated) {
                res.locals = {
                    status: 'bad',
                    message: 'Ya hay un usuario con el mismo correo'
                }
            } else {
                log('debug', `Hay ${Object.keys(err.errors).length} error en el documento de member`)
                res.locals.errors = getMongoDocumentErrors(err);
            }

            next()
        } else {
            res.locals = {
                status: 'ok',
                doc: {name, surname, email}
            }
            next()
        }
    })
}

export function retrieve(req, res, next) {
    let query = Member.find({})

    if (req.query.onlyAdmin === 'true') {
        query.where('pvLvl', {$gte: 2})
    }

    query.exec((err, docs) => {
        res.status(200)
        if (err) {
            res.locals.errors = err
            return next()
        }
        let users = docs.map(doc => {
            let {name, surname, email, pvLvl, _id} = doc
            return {name, surname, email, pvLvl, _id}
        })
        res.locals = {
            status: 'ok', users
        }
        next();
    })
}

export function update(req, res, next) {
    let {id} = req.params
    let $set = req.body
    Member.findByIdAndUpdate(id, {$set}, (err, doc) => {
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
    let {id} = req.params
    Member.findByIdAndRemove(id, (err, doc) => {
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

// 5aa406a5857d24062e658b80