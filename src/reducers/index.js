import { combineReducers } from 'redux'
import cards from './cards'
import flights from './flights'

export default combineReducers({
  cards,
  flights,
})
