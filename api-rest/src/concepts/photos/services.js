import Photos from './model'
import Member from '../members/model'

export function likes(req, res, next) {
    if (!req.user) {
        res.locals = {
            status: 'bad'
        }
        return next()
    }
    const photoId = req.params.id
    const userId = req.user._id
    console.log('recibida petición de me gusta para la foto:', photoId);
    
    const resolve = response => {
        console.log(response)
        res.locals = response
        console.log(res.locals);
        
        next()
    }

    Photos.findById(photoId).exec((err, photo) => {
        if (err) {
            console.log('HUBO UN ERROR',err);
            return resolve({err})
        }
        let indexOfUser = photo.likes.indexOf(userId)
        let notLike = indexOfUser === -1

        if (notLike) photo.likes.push(userId)
        else photo.likes.splice(indexOfUser, 1)

        photo.save((err, doc) => {
            Member.findById(userId, (err, user) => {
                if (err) {
                    console.log(err)
                    response.err = err
                    resolve(response)
                }

                user.photos = user.photos || []
                if (notLike) user.photos.push(photoId)
                else user.photos.splice(user.photos.indexOf(photoId), 1)

                user.save((err, user) => {
                    if (err) {
                        console.log(err)
                        response.err = err
                        resolve(response)
                    }

                    let response = {
                        status: 'ok',
                        likesPhotos: photo.likes,
                        likesUser: user.photos
                    }
                    
                    resolve(response)
                })
            })
        })

    })
}