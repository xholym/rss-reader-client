import http from 'axios'

const format = (e, op, type) => {
    const f = (s) => s.toString().toUpperCase()
    op = op ? `_${f(op)}` : ''

    return `${f(e)}${op}_${type}`
}

const provideServerUrl = () => 'https://cors-anywhere.herokuapp.com/'

function request(url) {
    return dispatch => {
        dispatch(this.pending())

        return http.get(provideServerUrl() + url)
            .then(({data}) => {
                dispatch(this.done(data))
            })
            .catch(e => {
                console.error(e)
                dispatch(this.error(e))
            })
    }
}

export function createFetchApi(
    entity,
    operation,
    init = {data: null}
) {
    const op = operation
    const types = {
        FETCH_DONE: format(entity, op, 'DONE'),
        FETCH_ERROR: format(entity, op, 'ERROR'),
        FETCH_PENDING: format(entity, op, 'PENDING')
    }

    const initState = { ...init, pending: false, error: null}

    const res = {
        state: initState,
        types,
        done: (data) => ({
            type: types.FETCH_DONE,
            data
        }),
        error: (error) => ({
            type: types.FETCH_ERROR,
            error
        }),
        pending: () => ({
            type: types.FETCH_PENDING
        }),
        reduce(dataToState = data => ({data})) {

            return (state = initState, action,) => {
                const t = types
                switch (action.type) {
                    case t.FETCH_DONE:
                        return { ...state, ...dataToState(action.data), pending: false, error: null }
                    case t.FETCH_PENDING:
                        return { ...state, pending: true }
                    case t.FETCH_ERROR:
                        return { ...state, pending: false, error: action.error }
                    default:
                        return state
                }
            }
        }
    }
    res.doFetch = request.bind(res)
    return res
}

export default createFetchApi
