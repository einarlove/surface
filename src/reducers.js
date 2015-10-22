import { combineReducers } from 'redux'
import { ADD_ITEM, REMOVE_ITEM } from './actions'

function items(state = [], action) {
  switch (action.type) {

  case ADD_ITEM:
    return [...state, {
      item: action.item,
      id: action.id,
    }]

  case REMOVE_ITEM:
    return state.filter(item => item.id !== action.id)

  default:
    return state
  }
}

export default combineReducers({
  items,
})
