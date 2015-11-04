import map from 'lodash/collection/map'
import reduce from 'lodash/collection/reduce'
import merge from 'lodash/object/merge'
import sortBy from 'lodash/collection/sortBy'
import moment from 'moment'

const MARGIN_DURATION_BEFORE_DEPARTURE = moment.duration(20, 'minutes')
const EXPECTED_WALKING_DURATION = moment.duration(5, 'minutes')

function multiplyEmphasises(...objects) {
  return merge(...objects, (aa, bb) => {
    return Number(parseFloat((aa || 1) * bb).toFixed(3))
  })
}

function isWithinDurationLimit(duration, toDeparture) {
  if (!duration || !toDeparture) {
    return true
  }
  const totalTime = MARGIN_DURATION_BEFORE_DEPARTURE + EXPECTED_WALKING_DURATION
  return moment.duration(toDeparture) > totalTime
}

function getMatchingProperties(aa, bb) {
  return reduce(aa, (total, value, key) => {
    if (key in bb) total[key] = value
    return total
  }, {})
}


export function getRelevance({emphasis, meta, toDeparture}) {
  const basis = reduce(emphasis, (total, value, key) => {
    if (key in meta) total[key] = value
    return total
  }, {})

  // if (meta.duration && toDeparture) {
  //   if (moment.duration(toDeparture) >= moment.duration(3, 'hours')) {
  //     if (moment.duration(meta.duration) > moment.duration(20, 'minutes')) {
  //       basis.planning = 1.2
  //     }
  //   }

  //   console.log(meta.duration, toDeparture)
  //   if (moment.duration(meta.duration) < moment.duration(toDeparture).add(20, 'minutes')) {
  //     basis['not enought time'] = 0.1
  //   }
  // }

  const score = reduce(basis, (total, value) => {
    const newTotal = Number(parseFloat(total * value).toFixed(3))
    return newTotal
  }, meta['base score'] || 1)

  return {
    score: score,
    basis: basis,
  }
}


function hasAndMismatchProperty(property, first, second) {
  return (property in first && property in second) && first[property] !== second[property]
}

export default function(state) {
  const { collection, questions } = state.cards
  const flight = state.flights.current

  const emphasis = questions
    .filter(question => question.answer && question.answer.emphasis)
    .map(question => question.answer.emphasis)
    .reduce(multiplyEmphasises, {})

  const result = collection
    .filter(({meta}) => !hasAndMismatchProperty('international', meta, flight))
    .filter(({meta}) => !hasAndMismatchProperty('direction', meta, flight))
    .map(card => ({
      card,
      relevance: getRelevance({emphasis, meta: card.meta, toDeparture: flight.toDeparture}),
    }))

  return sortBy(result, col => col.relevance.score).reverse()

  // return collection
  //   .filter(({meta}) => !hasAndMismatchProperty('international', meta, flight))
  //   .filter(({meta}) => !hasAndMismatchProperty('direction', meta, flight))
  //   .map(card => ({
  //     card,
  //     relevance: getRelevance(emphasis, card.meta),
  //   }))
  //   .sort((right, left) => {
  //     if (left.relevance.score < left.relevance.score) {
  //       return -1
  //     }
  //     if (right.relevance.score > left.relevance.score) {
  //       return 1
  //     }
  //     return 0
  //   })
  //   .reverse()
}
