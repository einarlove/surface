import moment from 'moment'

const WALKING_DURATION = moment.duration(5, 'minutes')
const REQUIRED_TIME_BEFORE_GO_TO_GATE = moment.duration(20, 'minutes')

export default state => {
  return moment.duration(state.flights.current.toDeparture)
    .subtract(WALKING_DURATION)
    .subtract(REQUIRED_TIME_BEFORE_GO_TO_GATE)
}
