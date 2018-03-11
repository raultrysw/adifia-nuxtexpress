import {Router} from 'express'
import {create, retrieve, update, destroy} from './controllers'

let router = new Router()

router.get('/', create)
router.post('/', create)
router.put('/:id', create)
router.delete('/:id', create)

export default router