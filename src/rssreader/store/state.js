import createFetchApi from './fetch'
import { runReducers } from '../utils/utils'
import createSortApi, { doSortBy } from './sort'

export const list = createFetchApi('article', 'list', { list: null })
export const sort = createSortApi('article', 'list')
const types = {
    SET_SOURCE: 'ARTICLE_SET_SOURCE',
    DETAIL: 'ARTICLE_SET_DETAIL'
}

export const rssSource = source => ({
    type: types.SET_SOURCE,
    source
})

export const setDetail = detail => ({
    type: types.DETAIL,
    detail
})

const rssToArticles = rss => {
    const domParser = new DOMParser()
    const doc = domParser.parseFromString(rss, 'text/xml')
    const items = []
    doc.querySelectorAll('item').forEach(it => {
        let enclosure = it.querySelector('enclosure')
        enclosure = {
            url: enclosure.getAttribute('url'),
            length: enclosure.getAttribute('length'),
            type: enclosure.getAttribute('type'),
        }

        items.push({
            id: it.querySelector('guid').innerHTML,
            title: it.querySelector('title').innerHTML,
            description: it.querySelector('description').innerHTML,
            pubDate: new Date(it.querySelector(('pubDate')).innerHTML),
            enclosure,
            link: it.querySelector(('link')).innerHTML
        })
    })
    return items
}

const reduceOther = (state, action) => {
    switch (action.type) {
        case types.SET_SOURCE:
            return { ...state, source: action.source }
        case types.DETAIL:
            return { ...state, detail: action.detail }
        default:
            return state
    }
}

function reduce(state = { ...list.state, detail: null, ...sort.state }, action) {
    return runReducers([
        list.reduce(data => ({ list: doSortBy(rssToArticles(data), state.order) })),
        sort.reduce,
        reduceOther
    ])(state, action)
}

export default reduce