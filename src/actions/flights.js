export const SET_CURRENT_FLIGHT = 'SET_CURRENT_FLIGHT'
export const SET_TIME_TO_DEPARTURE = 'SET_TIME_TO_DEPARTURE'

export function setCurrentFlight(payload) {
  return { type: SET_CURRENT_FLIGHT, payload}
}

export function setTimeToDeparture(payload) {
  return { type: SET_TIME_TO_DEPARTURE, payload}
}
