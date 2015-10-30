import { combineReducers } from 'redux'
import offers from '../data/offers.json'
import facilities from '../data/facilities.json'
import { SET_PRIORITY, ADD_PRIORITIES } from '../actions/cards'
import pick from 'lodash/object/pick'
import identity from 'lodash/utility/identity'

function collection(state = [...offers, ...facilities], action) {
  switch (action.type) {

  default:
    return state
  }
}

function priorities(state = {}, action) {
  switch (action.type) {

  case SET_PRIORITY:
    return pick(action.payload, identity)

  case ADD_PRIORITIES:
    return pick({...state, ...action.payload}, identity)

  default:
    return state
  }
}

export default combineReducers({
  collection,
  priorities,
})
