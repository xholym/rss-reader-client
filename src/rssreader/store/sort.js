export const SortType = {
    asc: 'asc',
    des: 'des',
    none: 'none'
}

export const noOrder = {
    target: null,
    type: SortType.none
}

const cmpFun = type => {
    if (type === SortType.asc)
        return (a, b) => a - b
    else if (type === SortType.des)
        return (a, b) => b - a
    else
        return () => 0
}

export const doSortBy = (list, { target, type }) => {
    const cmp = cmpFun(type)
    return list && [ ...list ].sort((a, b) => cmp(a[target], b[target]))
}

function createSortApi(entity, list) {
    const actionType = `${entity.toString().toUpperCase()}_SORT`

    return {
        type: actionType,
        sortBy: order => ({
            type: actionType,
            order
        }),
        state: { order: noOrder },
        reduce: (state = { order: noOrder }, {type, order}) => {
            if (type !== actionType)
                return state
            return { ...state, [list]: doSortBy(state.list, order), order }
        }
    }
}

export default createSortApi