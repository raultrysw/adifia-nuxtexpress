import Member from '../members/model'
import Article from './model'
const path = require('path')

export function uploadImage(req, res, next) {
    let pathImage = req.file.path
    
    let index = pathImage.indexOf(path.sep + 'img')
    let serverPath = 'http://localhost:7000/assets' + pathImage.substr(index, pathImage.length)
    
    res.locals = {
        url: serverPath,
        status: 'ok'
    }

    console.log(res.locals);
    console.log(pathImage);
    

    next();
}