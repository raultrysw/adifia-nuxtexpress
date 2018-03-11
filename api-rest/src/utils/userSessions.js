import {SECRET_JWT_TOKEN} from '../settings'
var jwt = require('jsonwebtoken');

export function decodifyToken(tokenStr) {
    return jwt.decode(tokenStr)
}

export function codifyToken (user) {
    return jwt.sign(user, SECRET_JWT_TOKEN)
}