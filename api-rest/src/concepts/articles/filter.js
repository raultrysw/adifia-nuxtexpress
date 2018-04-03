import Article from './model'
import {pipe} from '../../utils/pipeObjects'

function buildQuery({isJustVocal, isAdmin, notPutEvents, user}) {
    let query = Article.find()

    let filters = [
        [isJustVocal, query => query.where('author').equals(user._id)],
        [isAdmin, query => query.where('state').or([{author: user._id}, {state: {$gte: 1}}])],
        [notPutEvents, query => query.where('isEvent').equals(false)]
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