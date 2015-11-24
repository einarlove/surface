export default function debug(state = true, action) {
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
