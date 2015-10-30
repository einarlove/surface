export const SET_PRIORITY = 'SET_PRIORITY'
export const ADD_PRIORITIES = 'ADD_PRIORITIES'

export function setPriority(payload) {
  return { type: SET_PRIORITY, payload}
}

export function addPriorities(payload) {
  return { type: ADD_PRIORITIES, payload}
}
