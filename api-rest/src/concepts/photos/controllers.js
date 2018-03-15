import {logFactory} from '../../utils/log'
import Photo from './model'
import { pathPhotos } from './storage/photos';
import {codifyToken, decodifyToken} from '../../utils/userSessions'

const path = require('path')
const gm = require('gm').subClass({imageMagick: true})

export function create(req, res, next) {
    const {path, destination} = req.file;
    let photo = new Photo(req.body)
    
    let finalPath = path.join(destination, photo._id + '.jpg')
    gm(path).resize(500, 800).write(finalPath, (err) => {
        fs.unlink(path, err => {
            photo.save((err, doc) => {
                res.locals = {
                    status: 'ok',
                    doc
                }
                next()
            })
        })
    })
}

export function retrieve(req, res, next) {
    let token = decodifyToken(req.headers['jwt-user-token'])
    let filter = {}

    let theUserIsNotAdmin = token.pvLvl < 2
    
    if (theUserIsNotAdmin) {
        filter.valid = true
    }

    Photo.find(filter).exec((err, docs) => {
        res.status(200)
        if (err) {
            res.locals.errors = err
            return next()
        }
        let photos = docs.map(doc => {
            let {title, _id} = doc
            return {title, _id}
        })
        res.locals = {
            status: 'ok', docs: photos
        }
        next();
    })
}

export function update(req, res, next) {
    const $set = req.body

    let token = decodifyToken(req.headers['jwt-user-token'])
    let theUserIsNotAdmin = token.pvLvl < 2
    
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
    let token = decodifyToken(req.headers['jwt-user-token'])
    let theUserIsNotAdmin = token.pvLvl < 2
    
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