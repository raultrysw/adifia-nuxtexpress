const multer = require('multer')
const path = require('path')

let pathPhotos = path.join(__dirname, '../../../../assets/img/photos')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathPhotos)
    }
})

let parser = multer({storage})

export {parser, pathPhotos}