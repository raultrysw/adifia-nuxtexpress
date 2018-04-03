let query = Article.find()
query.populate('author', ['name', 'surname', 'email', 'rol'])
let user = req.user
let retrieveAll = req.query.all

if (retrieveAll && user) {
    let isAdmin = user.pvLvl >= 2
    let isVocal = user.pvLvl >= 1

    if (isVocal) {
        if (isAdmin) {
            query.where('state').or([{author: user._id}, {state: {$gte: 1}}])
            query.where('isEvent').equals(true)
        }
        else query.where('author').equals(user._id)
    }
} else query.where('state').equals(2)