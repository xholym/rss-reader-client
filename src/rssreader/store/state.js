import createFetchApi from './fetch'
import { runReducers, safeGet, xmlEncodedToStr } from '../utils/utils'
import createSortApi, { doSortBy, SortType } from './sort'
import { xml2js } from 'xml-js'

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

const rssToArticles = data => {
    const {rss} = xml2js(data, {compact: true, textFn: val => xmlEncodedToStr(val)})
    return rss.channel.item
        .map(it => {
            let enclosure = safeGet(it.enclosure, '_attributes')
            enclosure = enclosure && {
                url: enclosure.url,
                length: enclosure.length,
                type: enclosure.type,
            }
            return {
                id: safeGet(it.guid, '_text', '_cdata'),
                title: safeGet(it.title, '_text', '_cdata') ,
                description: safeGet(it.description, '_text', '_cdata'),
                pubDate: new Date(safeGet(it.pubDate, '_text', '_cdata')),
                enclosure,
                link: safeGet(it.link, '_text', '_cdata')
            }
        })
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
        list.reduce(data => ({ list: doSortBy(rssToArticles(data), { target: 'pubDate', type: SortType.des}) })),
        sort.reduce,
        reduceOther
    ])(state, action)
}

export default reduce