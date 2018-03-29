const {decode, encode} = require('./user-token')

let user = {
    name: 'raul',
    surname: 'contreras'
}

let userToken = encode(user)
let payloadUser = decode(userToken)

console.log('user =>', userToken, "object\n", payloadUser)