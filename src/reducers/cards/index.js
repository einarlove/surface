import { combineReducers } from 'redux'
import collection from './collection'
import questions from './questions'

export default combineReducers({
  collection,
  questions,
})
