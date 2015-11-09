import { combineReducers } from 'redux'
import collection from './collection'
import questions from './questions'
import relevanceTolerance from './relevanceTolerance'

export default combineReducers({
  collection,
  questions,
  relevanceTolerance,
})
