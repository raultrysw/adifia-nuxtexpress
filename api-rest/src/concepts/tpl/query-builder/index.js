import Model from '../model'
import {pipe} from '../../../utils/pipeObjects'
import {theAuthor, eachAuthorArticleState, isEvent, stateAt2} from './filters'

function buildQuery({isJustVocal, isAdmin, notPutEvents, user, requestAll}) {
    let query = Model.find()

    let filters = [
    ]

    return pipe(query, function() {
        this.through(filters)
        return this.retrieve()
    })
}

export function filterFor({}) {
    const state = {
    }
    
    return buildQuery(state)
}