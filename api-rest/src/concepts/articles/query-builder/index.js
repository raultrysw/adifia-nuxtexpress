import Article from '../model'
import {pipe} from '../../../utils/pipeObjects'
import {theAuthor, eachAuthorArticleState, isEvent, stateAt2} from './filters'

function buildQuery({isJustVocal, isAdmin, notPutEvents, user, requestAll}) {
    let query = Article.find()
    let author = user && user._id
    
    let filters = [
        [isJustVocal, theAuthor(author)],
        [isAdmin, eachAuthorArticleState(author)],
        [notPutEvents, isEvent(false)],
        [!requestAll, stateAt2()]
    ]

    return pipe(query, function() {
        this.through(filters)
        return this.retrieve()
    })
}

export function filterFor({query, params, user, loginLvl}) {
    const state = {
        isAdmin: loginLvl && loginLvl.isAdmin,
        isVocal: loginLvl && loginLvl.isVocal,
        requestAll: query.all,
        user
    }
    state.isJustVocal = state.isAdmin !== undefined && !state.isAdmin
    state.eventsRequested = state.isAdmin && state.requestAll
    state.notPutEvents = !state.eventsRequested
    
    return buildQuery(state)
}