import {Router} from 'express'
import {create, retrieve, update, destroy} from './controllers'
import {parser} from './storage/photos'

const bodyParser = require('body-parser')

let router = new Router()

router.get('/', retrieve)
router.post('/', parser.single('photo'), create)
router.put('/:id', bodyParser.json(), update)
router.delete('/:id', destroy)

export default router