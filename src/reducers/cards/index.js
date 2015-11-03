import { combineReducers } from 'redux'
import collection from './collection'
import emphasis from './emphasis'
import questions from './questions'

export default combineReducers({
  collection,
  emphasis,
  questions,
})
