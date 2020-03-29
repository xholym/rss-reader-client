import { combineReducers } from 'redux'
import articleReduce from './state'

const reducers = combineReducers({
    article: articleReduce
})

export default reducers