import logFactory from '../../utils/log'
import {getMongoDocumentErrors} from '../../utils/controllerUtils'
import Member from './model'

const DUPLICATE_ERROR_CODE = 11000

const log = logFactory('MEMBERS CONTROLLER')

export function create(req, res, next) {
    const {name, surname, email, password} = req.body
    log('debug', 'Creando el usuario: ' + email)
    const member = new Member({name, surname, email, password})

    const {ERROR_CODES, createBadResponse, createGoodResponse} = req

    member.save(member, (err, member) => {
        res.status(200)
        if (err) {
            let isDuplicated = err.code === DUPLICATE_ERROR_CODE

            if (isDuplicated) 
                res.locals = createBadResponse(ERROR_CODES.BAD_MAKED_DOCUMENT, 'Ya hay un usuario con el mismo correo')
            else {
                res.locals = createBadResponse(ERROR_CODES.BAD_MAKED_DOCUMENT, 'Hay varios errores en el documento', {errors: getMongoDocumentErrors(err)})
                res.locals.errors = getMongoDocumentErrors(err);
            }

            next()
        } else {
            res.locals = createGoodResponse(ERROR_CODES.CREATED_DOCUMENT, 'Te has registrado correctamente', {member})
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
            let response = req.createBadResponse(500, 'Hubo un error interno')
            res.locals.errors = err
            return next(response)
        }
        let users = docs.map(doc => {
            let {name, surname, email, pvLvl, _id} = doc
            return {name, surname, email, pvLvl, _id}
        })
        res.locals = req.createGoodResponse(200, 'Los artículos fueron recuperados correctamente')
        next();
    })
}

export function update(req, res, next) {
    let {id} = req.params
    let $set = req.body
    Member.findByIdAndUpdate(id, {$set}, (err, user) => {
        res.status(200)
        if (err) {
            let response = req.createBadResponse(500, 'Hubo un error interno')
            res.locals.errors = err
            return next(response)
        }
        res.locals = req.createGoodResponse(210, 'El usuario fue actualizado correctamente')
        next()
    })
}

export function destroy(req, res, next) {
    let {id} = req.params
    Member.findByIdAndRemove(id, (err, user) => {
        res.status(200)
        if (err) {
            let response = req.createBadResponse(500, 'Hubo un error interno')
            res.locals.errors = err
            return next(response)
        }
        res.locals = req.createGoodResponse(211, 'El usuario fue eliminado correctamente', {user})
        next()
    })    
}

// 5aa406a5857d24062e658b80