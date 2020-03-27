import createFetchApi from '../store/fetch'
import { runReducers } from '../utils/utils'

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

export const list = createFetchApi(
    'article', 'list',
    { list: null },
    data => {
        const domParser = new DOMParser()
        const doc = domParser.parseFromString(data, 'text/xml')
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
                pubDate: it.querySelector(('pubDate')).innerHTML,
                enclosure,
                link: it.querySelector(('link')).innerHTML
            })
        })
        return { list: items }
    }
)

function reduce(state = { list: null, detail: null, error: null, pending: false }, action) {
    return runReducers([
        list.reduce,
        (state, action) => {
            switch (action.type) {
                case types.SET_SOURCE:
                    return { ...state, source: action.source }
                case types.DETAIL:
                    return { ...state, detail: action.detail }
                default:
                    return state
            }
        }
    ])(state, action)
}

export default reduce