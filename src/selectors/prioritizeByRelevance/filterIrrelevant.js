import isUndefined from 'lodash/lang/isUndefined'

const bothHasPropertyAndMismatch = (left, right) => {
  return !isUndefined(left) && !isUndefined(right) && left !== right
}

export default state => ({meta}) => {
  const flight = state.flights.current

  if (!flight) {
    return true
  }

  if (bothHasPropertyAndMismatch(meta.direction, flight.direction)) {
    return false
  }

  if (bothHasPropertyAndMismatch(meta.international, flight.international)) {
    return false
  }

  return true
}
