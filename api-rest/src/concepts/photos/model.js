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
    email: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }],
    location: {
        type: String
    },
    description: ''
})

class MemberClass {
}

schema.loadClass(MemberClass)

let membersModel = mongoose.model('Photo', schema)
log('debug', 'Modelo members creado')

export default membersModel