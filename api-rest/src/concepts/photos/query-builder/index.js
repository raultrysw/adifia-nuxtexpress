import Photo from '../model'
import {pipe} from '../../../utils/pipeObjects'
import {photosValid, limitTo, sortByLikes} from './filters'

function buildQuery({notPutAll, limit, sortingByLikes}) {
    let query = Photo.aggregate()

    let filters = [
        [notPutAll, photosValid()],
        [sortingByLikes, sortByLikes(true)],
        [limit !== undefined, limitTo(limit)]
    ]

    return pipe(query, function() {
        this.through(filters)
        return this.retrieve()
    })
}

export function filterFor({loginLvl, query}) {
    console.log('query', query);
    
    const state = {
        isAdmin: loginLvl && loginLvl.isAdmin,
        requestAll: query.all,
        limit: query.limit && Number(query.limit),
        sortingByLikes: query.sort === 'likes'
    }
    state.notPutAll = !state.isAdmin || (state.isAdmin && !state.requestAll)
    console.log('No poniendolo todo', state.notPutAll, state.isAdmin, state.requestAll);
    console.log(state);
    
    
    return buildQuery(state)
}