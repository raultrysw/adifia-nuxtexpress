import logFactory from '../../utils/log'
const mongoose = require('mongoose')
const log = logFactory('MEMBERS MODEL')

let schema = new mongoose.Schema({
    
})

class MemberClass {

}

schema.loadClass(MemberClass)

let membersModel = mongoose.model('Member', schema)
log('debug', 'Modelo members creado')

export default membersModel