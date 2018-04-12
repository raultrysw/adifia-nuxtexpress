import {logFactory} from '../../utils/log'
import Photo from './model'
import { pathPhotos } from './storage/photos';
import {filterFor} from './query-builder'

const mPath = require('path')
const gm = require('gm').subClass({imageMagick: true})
const fs = require('fs')

export function create(req, res, next) {
    const {path, destination} = req.file;
    let photo = new Photo(req.body)
    
    let finalPath = mPath.join(destination, photo._id + '.jpg')
    gm(path).resize(500, 800).write(finalPath, (err) => {
        fs.unlink(path, err => {
            photo.save((err, photo) => {
                res.locals = req.createGoodResponse(201, 'La foto ha sido creada correctamente', {photo})
                
                next()
            })
        })
    })
}

export function retrieve(req, res, next) {
    let query = filterFor(req)
    
    query.exec((err, photos) => {
        res.status(200)
        if (err) {
            let response = req.createBadResponse(500, 'Ha habido un error interno', {})
            res.locals.errors = err
            return next(response)
        }
        res.locals = req.createGoodResponse(200, 'Las fotos se recuperaron correctamente', {photos})
        next();
    })
}

export function update(req, res, next) {
    const $set = req.body

    let user = req.user
    console.log(user);
    
    let theUserIsNotAdmin = user.pvLvl < 2
    
    if (theUserIsNotAdmin) {
        let response = req.createBadResponse(401, 'Usted no esta autorizado para realizar esta acción')
        return next(response)
    }

    Photo.findByIdAndUpdate(req.params.id, {$set}, (err, doc) => {
        res.locals = req.createGoodResponse(210, 'La foto fue actualizada correctamente')
        next()
    })
}

export function destroy(req, res, next) {
    let user = req.user
    let theUserIsNotAdmin = user.pvLvl < 2
    
    if (theUserIsNotAdmin) {
        let response = req.createBadResponse(401, 'Usted no está autorizado para realizar esta acción')
        return next(response)
    }

    Photo.findByIdAndRemove(req.params.id, (err, doc) => {
        fs.unlink(path.join(pathPhotos, req.params.id + '.jpg'), (err) => {
            res.locals = req.createGoodResponse(211, 'La foto fue eliminada correctamente')
            next()
        })
    })
}