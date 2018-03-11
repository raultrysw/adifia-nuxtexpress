import {Router} from 'express'
import {create, retrieve, update, destroy} from './controllers'
import {logIn, setAvatar, normalizeAvatarImage} from './services'
import avatarParser from './storage/avatar'

let bodyParser = require('body-parser')


let router = new Router()

router.post('/', bodyParser.json(), create)
router.get('/', retrieve)
router.put('/:id', bodyParser.json(), update)
router.delete('/:id', destroy)

router.post('/login', bodyParser.json(), logIn)
router.put('/serv/avatar', avatarParser.single('avatar'), normalizeAvatarImage, setAvatar)

export default router