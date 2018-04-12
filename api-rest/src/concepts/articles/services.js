import Member from '../members/model'
import Article from './model'
const path = require('path')

export function uploadImage(req, res, next) {
    let pathImage = req.file.path
    
    let index = pathImage.indexOf(path.sep + 'img')
    let serverPath = 'http://localhost:7000/assets' + pathImage.substr(index, pathImage.length)
    
    res.locals = req.createGoodResponse(201, 'Las imagenes fueron subidas correctemnte', {path: serverPath})

    next();
}