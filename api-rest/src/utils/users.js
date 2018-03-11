const bcrypt = require('bcrypt')

let saltRounds = 10

export function encrypt(value) {
    let salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(value, salt)
}

export function comparePassword(pass, encrypedPassword, cb) {
    bcrypt.compare(pass, encrypedPassword, cb)
}