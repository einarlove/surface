import moment from 'moment'

export default (state, {time}) => {
  if (state.duration && moment.duration(time)) {
    return {
      ...state,
      notEnoughTime: 1.2,
    }
  }

  return state
}
