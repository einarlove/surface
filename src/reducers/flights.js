import { combineReducers } from 'redux'
import { SET_CURRENT_FLIGHT, SET_TIME_TO_DEPARTURE } from '../actions/flights'

function collection(state = [], action) {
  switch (action.type) {

  default:
    return state
  }
}

const initialCurrent = {
  toDeparture: 'PT3H',
}

function current(state = initialCurrent, action) {
  switch (action.type) {

  case SET_CURRENT_FLIGHT:
    return {...action.payload}

  case SET_TIME_TO_DEPARTURE:
    return {...state, toDeparture: action.payload}

  default:
    return state
  }
}

export default combineReducers({
  collection,
  current,
})
