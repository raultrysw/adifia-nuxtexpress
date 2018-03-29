import {Router} from 'express'
import {create, retrieve, update, destroy, get} from './controllers'
import {uploadImage} from './services'
import imagesStorage from './storage/uploadImage'

const bodyParser = require('body-parser')

let router = new Router()

router.post('/serv/uploadimage', imagesStorage.single('image'), uploadImage)

router.get('/', retrieve)
router.get('/:id', get)
router.post('/', bodyParser.json(), create)
router.put('/:id', bodyParser.json(), update)
router.delete('/:id', destroy)

export default router