const jwtSimple = require('jwt-simple')

const secret = ':q91dMHPT*;"WX^0%ih'

const decode = (token) => jwtSimple.decode(token, secret)
const encode = (objectUser) => jwtSimple.encode(objectUser, secret)

function recoverUser(req, res, next) {
    const userToken = req.headers['jwt-user-token'] || req.query.token

    if (userToken) {
        try {
            req.user = decode(userToken)
            req.loginLvl = {
                isAdmin: req.user.pvLvl >= 2,
                isVocal: req.user.pvLvl >= 1,
                isPartner: req.user.pvLvl >= 0
            }
        } catch (error) {
            console.log('El usuario no se pudo descifrar');
        } finally {
            next()
        }
    } else next()
}

module.exports = {decode, encode, recoverUser}