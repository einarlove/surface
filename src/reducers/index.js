import { combineReducers } from 'redux'
import cards from './cards'
import flights from './flights'
import debug from './debug'

export default combineReducers({
  cards,
  flights,
  debug,
})
