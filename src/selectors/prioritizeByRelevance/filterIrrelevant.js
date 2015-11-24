import isUndefined from 'lodash/lang/isUndefined'
import moment from 'moment'

const bothHasPropertyAndMismatch = (left, right) => {
  return !isUndefined(left) && !isUndefined(right) && left !== right
}

export default state => ({meta}) => {
  if (state.flights.current) {
    const flight = state.flights.current
    if (bothHasPropertyAndMismatch(meta.direction, flight.direction)) {
      return false
    }

    if (bothHasPropertyAndMismatch(meta.international, flight.international)) {
      return false
    }
  }


  if (meta.expiration) {
    const now = moment()
    const {from, to} = meta.expiration

    if (from && now.isBefore(from)) {
      return false
    }

    if (to && now.isAfter(to)) {
      return false
    }
  }

  return true
}
