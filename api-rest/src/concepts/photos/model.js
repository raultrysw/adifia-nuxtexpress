import logFactory from '../../utils/log'
const mongoose = require('mongoose')
const log = logFactory('MEMBERS MODEL')

let schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    valid: {
        type: Boolean,
        default: false
    },
    emailSender: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: [true, 'Sin la dirección no se sabe donde esta el escalón']
    }
})

class MemberClass {

}

schema.loadClass(MemberClass)

let membersModel = mongoose.model('Photo', schema)
log('debug', 'Modelo members creado')

export default membersModel