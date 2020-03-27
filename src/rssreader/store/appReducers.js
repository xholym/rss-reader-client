import { combineReducers } from 'redux'
import articleReduce from '../article/articleState'

const appReducers = combineReducers({
    article: articleReduce
})

export default appReducers