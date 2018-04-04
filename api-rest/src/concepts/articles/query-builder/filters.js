export const theAuthor = (author) => {
    return query => query.where('author').equals(author)
}
export const eachAuthorArticleState = (author) => {
    return query => query.where('state').or([{author}, {state: {$gte: 1}}])
}
export const isEvent = (isEvent) => {
    return query => query.where('isEvent').equals(false)
}
export const stateAt2 = () => {
    return query => query.where('state').equals(2)
}