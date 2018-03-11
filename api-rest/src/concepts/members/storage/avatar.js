let multer = require('multer')
let path = require('path')

let pathAvatars = path.join(__dirname, '../../../../assets/img/avatars')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathAvatars)
    }
})

let parser = multer({storage})

export default parser