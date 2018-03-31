const jwtSimple = require('jwt-simple')

const secret = ':q91dMHPT*;"WX^0%ih'

const decode = (token) => jwtSimple.decode(token, secret)
const encode = (objectUser) => jwtSimple.encode(objectUser, secret)

function recoverUser(req, res, next) {
    const userToken = req.headers['jwt-user-token']

    if (userToken) {
        try {
            req.user = decode(userToken)
            
        } catch (error) {
            console.log('El usuario no se pudo descifrar');
        } finally {
            next()
        }
    } else next()
}

module.exports = {decode, encode, recoverUser}