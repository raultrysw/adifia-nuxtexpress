import {logFactory} from '../../utils/log'
import Photo from './model'
import { pathPhotos } from './storage/photos';

const mPath = require('path')
const gm = require('gm').subClass({imageMagick: false})
const fs = require('fs')

export function create(req, res, next) {
    const {path, destination} = req.file;
    let photo = new Photo(req.body)
    
    console.log('files: ',req.file);
    

    let finalPath = mPath.join(destination, photo._id + '.jpg')
    gm(path).resize(500, 800).write(finalPath, (err) => {
        fs.unlink(path, err => {
            photo.save((err, doc) => {
                res.locals = {
                    status: 'ok',
                    doc
                }
                console.log('Todo ha sido hecho con éxito');
                
                next()
            })
        })
    })
}

export function retrieve(req, res, next) {
    let user = req.user
    let filter = {}

    if (user) {
        let theUserIsNotAdmin = user.pvLvl < 2
        if (theUserIsNotAdmin) filter.valid = true
    } else if (user === null) {
        filter.valid = true
    } else {}

    Photo.find(filter).exec((err, docs) => {
        res.status(200)
        if (err) {
            res.locals.errors = err
            return next()
        }
        let photos = docs.map(doc => {
            let {title, _id, likes} = doc
            return {title, _id, likes}
        })
        res.locals = {
            status: 'ok', docs: photos
        }
        next();
    })
}

export function update(req, res, next) {
    const $set = req.body

    let user = req.user
    console.log(user);
    
    let theUserIsNotAdmin = user.pvLvl < 2
    
    if (theUserIsNotAdmin) {
        res.status(404)
        res.locals = {
            status: 'bad'
        }
        return next()
    }

    Photo.findByIdAndUpdate(req.params.id, {$set}, (err, doc) => {
        res.locals = {
            status: 'ok',
            doc
        }
        next()
    })
}

export function destroy(req, res, next) {
    let user = req.user
    let theUserIsNotAdmin = user.pvLvl < 2
    
    if (theUserIsNotAdmin) {
        res.status(404)
        res.locals = {
            status: 'bad'
        }
        return next()
    }

    Photo.findByIdAndRemove(req.params.id, (err, doc) => {
        fs.unlink(path.join(pathPhotos, req.params.id + '.jpg'), (err) => {
            res.locals = {
                status: 'ok'
            }
            next()
        })
    })
}