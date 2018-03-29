import Member from './model'
import logFactory from '../../utils/log'
const {encode} = require('../../../../utils/user-token')

const fs = require('fs')
const pathM = require('path')

const gm = require('gm').subClass({imageMagick: true});
const jwt = require('jsonwebtoken');
const log = logFactory("EN MEMBERS SERVICES")

export function normalizeAvatarImage(req, res, next) {
    const {path, destination} = req.file;

    let user = req.user
    let newFileName = user._id + '.jpg'

    req.userId = user._id

    let finalPath = pathM.join(destination, newFileName)
    gm(path).resize(400, 600).write(finalPath, (err) => {
        fs.unlink(path, (err) => {
            res.locals = {
                status: 'ok',
                filename: finalPath
            }
            next()
        })
    })
}

export function setAvatar(req, res, next) {
    let $set= {avatar: true}
    log('debug', 'actualizando información de usuario')
    Member.findByIdAndUpdate(req.userId, {$set}).exec((err, doc) => {
        next()
    })
}

export function logIn(req, res, next) {
    res.status(200)
    const {email, password} = req.body
    log("debug", `Buscando un usuario con ${email}`)
    Member.compareUserAndPass({email, password}, (err, doc, result) => {
        if (doc === null && !err) {
            log('debug', 'No se enconro el usuario')
            if (doc === null || !result) {
                res.locals = {
                    status: 'bad',
                    message: 'Usuario no encontrado'
                }
                return next()
            }
        } else {
            if (err) {
                log('debug', 'Han habido errores')
                res.locals.errors = err
                return next()
            }
        }

        const {name, surname, pvLvl, _id, avatar} = doc._doc
        const userFound = {email, name, surname, pvLvl, _id, avatar}
        userFound.token = encode(userFound)
        log('debug', 'Enviando datos de usuario')
        console.log(doc);
        
        
        res.locals = {
            status: result ? 'ok': 'bad',
            userFound: (result && userFound) || false
        }
        if (!result) res.locals.message = 'Usuario no encontrado'
        return next()
    })
}