import Member from './model'
import logFactory from '../../utils/log'
import { ServerResponse } from 'http';
const {encode} = require('../../../../utils/user-token')

const fs = require('fs')
const pathM = require('path')

const gm = require('gm').subClass({imageMagick: false});
const log = logFactory("EN MEMBERS SERVICES")

const PATH_TO_AVATARS = 'http://localhost:7000/assets/img/avatars'

export function normalizeAvatarImage(req, res, next) {
    const {path, destination} = req.file;

    let user = req.user
    let newFileName = user._id + '.png'

    req.userId = user._id

    let finalPath = pathM.join(destination, newFileName)
    log('debug', 'Escribiendo imagen en: ' + finalPath)
    gm(path).resize(400, 600).write(finalPath, (err) => {
        if (err) {
            let response = req.createBadResponse(500, 'Hubo un error interno')
            res.locals.errors = err
            return next(response)
        }
        fs.unlink(path, (err) => {
            let filename = pathM.join(PATH_TO_AVATARS, newFileName)
            res.locals = req.createGoodResponse(201, 'Avatar creado correctamente', {filename})
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
    Member.compareUserAndPass({email, password}, (err, user, result) => {
        console.log(err, user, result, req.body);
        
        if (user === null && !err) {
            log('debug', 'No se enconro el usuario')
            if (user === null || !result) {
                console.log('usuario no entontrado');
                
                let response = req.createBadResponse(404, 'Usuario no encontrado', {errors: err})
                res.locals = response
                return next()
            }
        } else {
            if (err) {
                console.log('hubo un error', err);
                
                let response = req.createBadResponse(500, 'Hubo un error interno')
                res.locals.errors = err
                return next(response)
            }
        }
        const {name, surname, pvLvl, _id, avatar, photos} = user._doc
        const userFound = {email, name, surname, pvLvl, _id, avatar, photos}
        if (!userFound.photos) userFound.photos = []
        userFound.token = encode(userFound)
        log('debug', 'Enviando datos de usuario')
        
        res.locals = req.createGoodResponse(201, 'Sesión creada correctamente', {user: userFound})
        return next()
    })
}