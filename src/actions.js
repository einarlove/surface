import uniqueId from 'lodash/utility/uniqueId'

export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REGISTER_ITEM_HEIGHT = 'REGISTER_ITEM_HEIGHT'

export function addItem() {
  const id = uniqueId('item_')
  return { type: ADD_ITEM, id}
}

export function removeItem(id) {
  return { type: REMOVE_ITEM, id}
}

export function registerItemHeight(id, height) {
  return {
    type: REGISTER_ITEM_HEIGHT,
    id, height,
  }
}
