import express from 'express'
import {PORT, DB_MONGO_URI, ASSETS_DIR} from './settings'

import {router as MEMBERS_ROUTER, model as MEMBERS_MODEL, BASE_URL as BASE_URL_FOR_MEMBERS} from './concepts/members/'
import {router as ARTICLES_ROUTER, model as ARTICLES_MODEL, BASE_URL as BASE_URL_FOR_ARTICLES} from './concepts/articles/'
import {router as PHOTOS_ROUTER, model as PHOTOS_MODEL, BASE_URL as BASE_URL_FOR_PHOTOS} from './concepts/photos/'
import logFactory from './utils/log'

import {createBadResponse, createGoodResponse} from './utils/response-maker.js'

import ERROR_CODES from './error-codes.js';

const {recoverUser} = require('../../utils/user-token')
const cors = require('cors')
const log = logFactory("ROOT APP")
const mongoose = require('mongoose')

mongoose.connect(DB_MONGO_URI, {}, upServer)

express.request.__proto__.createBadResponse = createBadResponse
express.request.__proto__.createGoodResponse = createGoodResponse
express.request.__proto__.ERROR_CODES = ERROR_CODES

function upServer(error) {
    if (error) {
        log('error', 'No se pudo nectar a la base de datos: ' + error.message);
        return
    }
    log('info', 'Conectado correctamente a la base de datos');
    
    const server = express();
    
    server.use(recoverUser)
    server.use('/assets', express.static(ASSETS_DIR))
    
    server.use(cors())
    
    server.use(BASE_URL_FOR_MEMBERS, MEMBERS_ROUTER)
    server.use(BASE_URL_FOR_ARTICLES, ARTICLES_ROUTER)
    server.use(BASE_URL_FOR_PHOTOS, PHOTOS_ROUTER)
    
    server.use(errorHandler)
    server.use(endRequest)
    
    server.listen(PORT, () => {
        log('info', 'Running in ' + process.env.NODE_ENV + ' en el puerto ' + PORT);
    });
}

let errorHandler = function(err, req, res, next) {
    console.log(err.stack)
    log('error', 'HUBO UN ERROR (' + err.message + ')')
    res.locals = req.createBadResponse(500, 'Hubo un error interno', {data: res.locals})
    next();
}

let endRequest = function(req, res) {
    res.status(res.locals.status)
    res.json(res.locals)
}
