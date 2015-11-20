export default function debug(state = false, action) {
  switch (action.type) {

  case 'ENABLE_DEBUG':
    return true

  case 'DISABLE_DEBUG':
    return false

  case 'TOGGLE_DEBUG':
    return !state

  default:
    return state
  }
}
