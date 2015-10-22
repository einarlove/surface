import uniqueId from 'lodash/utility/uniqueId'

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REGISTER_ITEM_HEIGHT = 'REGISTER_ITEM_HEIGHT'

export function addItem(item) {
  const id = uniqueId('item_')
  return { type: ADD_ITEM, item, id}
}

export function removeItem(id) {
  return { type: REMOVE_ITEM, id}
}
