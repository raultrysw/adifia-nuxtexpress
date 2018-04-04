export const photosValid = () => {
    return query => query.match({valid: true})
}
export const limitTo = (limit) => {
    return query => query.limit(limit)
}
export const sortByLikes = (sort) => {
    return query => {
        query.project({
            title: 1,
            valid: 1,
            email: 1,
            likes: 1,
            location: 1,
            description: 1,
            likesLength: {$size: '$likes'}
        })
        return query.sort({likesLength: -1})
    }
}