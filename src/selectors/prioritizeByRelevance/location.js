import moment from 'moment'

const gateAsNumber = gate => parseInt(gate, 10)

const withinProximity = (first, second, margin = 1) => {
  return Math.abs(gateAsNumber(first) - gateAsNumber(second)) <= margin
}

const proximityLabel = (proximity, location) => `${proximity || 'At'} ${location}`

export default (reasons, {meta, state, timeAvailable}) => {
  if (!meta.location) {
    return reasons
  }

  const { type, name: location, proximity } = meta.location
  const flight = state.flights.current
  const flightGate = flight && flight.status.gate
  const isGate = type === 'gate'

  const flightBehindPassport = gateAsNumber(flightGate) >= 50
  const locationBehindPassport = (isGate && gateAsNumber(location) >= 50) || location === 'passport control'

  if (isGate && flightGate && withinProximity(location, flightGate)) {
    reasons.push({
      reason: 'Close to gate',
      relevance: 1.05,
    })
  }

  if (flightBehindPassport && locationBehindPassport) {
    reasons.push({
      reason: proximityLabel(proximity, 'passport control'),
      relevance: 1.2,
    })
  }

  if (location === 'security control') {
    if (timeAvailable >= moment.duration(1, 'hours')) {
      reasons.push({
        reason: proximityLabel(proximity, location),
        relevance: 1.05,
      })
    }

    if (timeAvailable <= moment.duration(20, 'minutes')) {
      reasons.push({
        reason: `Likely past ${location}`,
        relevance: 0.4,
      })
    }
  }

  if (location === 'parking') {
    if (timeAvailable >= moment.duration(2, 'hours')) {
      reasons.push({
        reason: proximityLabel(proximity, location),
        relevance: 1.2,
      })
    }

    if (timeAvailable <= moment.duration(40, 'minutes')) {
      reasons.push({
        reason: `Less likely time for ${location}`,
        relevance: 0.4,
      })
    }
  }

  return reasons
}
