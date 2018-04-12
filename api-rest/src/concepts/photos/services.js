import Photos from './model'
import Member from '../members/model'

export function likes(req, res, next) {
    if (!req.user) {
        let response = req.createBadResponse(401, 'Tienes que estar autorizado para dar like a las fotos')
        return next(response)
    }
    const photoId = req.params.id
    const userId = req.user._id
    
    Photos.findById(photoId).exec((err, photo) => {
        if (err) {
            let response = req.createBadResponse(500, 'Hubo un error interno')
            return next(response)
        }
        let indexOfUser = photo.likes.indexOf(userId)
        let notLike = indexOfUser === -1

        if (notLike) photo.likes.push(userId)
        else photo.likes.splice(indexOfUser, 1)

        photo.save((err, doc) => {
            Member.findById(userId, (err, user) => {
                if (err) {
                    let response = req.createBadResponse(500, 'Hubo un error interno')
                    return next(response)
                }

                user.photos = user.photos || []
                if (notLike) user.photos.push(photoId)
                else user.photos.splice(user.photos.indexOf(photoId), 1)

                user.save((err, user) => {
                    if (err) {
                        let response = req.createBadResponse(500, 'Hubo un error interno')
                        return next(response)
                    }

                    let responseData = {
                        status: 'ok',
                        message: 'La foto fue actualizada correctamente',
                        data: {
                            likesPhotos: photo.likes,
                            likesUser: user.photos
                        }
                    }

                    res.locals = req.createGoodResponse(responseData)
                    next()
                })
            })
        })

    })
}