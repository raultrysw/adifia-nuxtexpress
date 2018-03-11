import Member from '../members/model'
import Article from './model'
import {decodifyToken} from '../../utils/userSessions'

export function uploadImage(req, res, next) {
    let {path} = req.file
    
    let index = path.indexOf('/img')
    let serverPath = 'http://localhost:7000/assets' + path.substr(index, path.length)
    
    res.locals = {
        url: serverPath,
        status: 'ok'
    }

    next();
}

export function getUnPublished(req, res, next) {
    Article.find({state: 1}).populate('author', 'name surname').exec((err, articles) => {
        res.locals.articles = articles
        next()
    })
}
export function getMine(req, res, next) {
    let user = decodifyToken(req.headers['jwt-user-token'])
    
    Member.findOne({email: user.email}).exec((err, user) => {
        let id = user._id

        Article.find({author: id}).populate('author', 'name surname').exec((err, articles) => {
            res.locals.articles = articles
            next()
        })
    })

}