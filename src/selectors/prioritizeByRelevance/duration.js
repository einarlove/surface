import round from 'lodash/math/round'
import moment from 'moment'

export default (reasons, {meta, timeAvailable}) => {
  if (!meta.duration) {
    return reasons
  }

  const duration = moment.duration(meta.duration)

  if (duration > timeAvailable) {
    reasons.push({
      reason: 'Not enough time',
      relevance: round(timeAvailable / (duration * 1.2), 2),
    })
  }

  return reasons
}
