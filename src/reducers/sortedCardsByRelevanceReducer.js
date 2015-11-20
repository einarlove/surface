import pick from 'lodash/object/pick'
import round from 'lodash/math/round'
import reduce from 'lodash/collection/reduce'
import merge from 'lodash/object/merge'
import { duration } from 'moment'
import isUndefined from 'lodash/lang/isUndefined'

const WALKING_DURATION = duration(10, 'minutes')
const REQUIRED_TIME_BEFORE_GO_TO_GATE = duration(20, 'minutes')

const multiplyRounded = (left, right) => {
  return round(left * right, 2)
}

const multiplyEmphasises = (...objects) => {
  return merge(...objects, multiplyRounded)
}

const transformToCardWithRelevance = item => {
  return {item, id: item.id, relevance: {basis: {}}}
}

const sameValueIfExistFilter = (property, value) => card => {
  const {meta} = card.item
  const metaValue = meta[property]

  if (isUndefined(value) || isUndefined(metaValue)) {
    return true
  }

  return value === metaValue
}

const getEmphasis = state => {
  return state.cards.questions
    .filter(question => question.answer)
    .map(question => question.answer.emphasis)
    .reduce(multiplyEmphasises, {})
}

const applyTimeEmphasis = (cardDuration, basis, timeAvailable) => {
  if (timeAvailable >= duration(2, 'hours')) {
    if (duration(cardDuration) >= duration(20, 'minutes')) {
      basis.longDurartion = 1.2
    }
  }
  if (duration(cardDuration) > timeAvailable) {
    basis.toLongDuration = 0.1
  }
}

const getRelevanceBasis = state => {
  const emphasis = getEmphasis(state)
  const {toDeparture} = state.flights.current
  const timeAvailable = duration(toDeparture)
    .subtract(WALKING_DURATION)
    .subtract(REQUIRED_TIME_BEFORE_GO_TO_GATE)

  return card => {
    const {meta} = card.item
    const basis = pick(emphasis, (val, prop) => prop in meta)

    if (meta.baseRelevance) {
      basis.baseRelevance = meta.baseRelevance
    }

    if (meta.duration) {
      applyTimeEmphasis(meta.duration, basis, timeAvailable)
    }

    card.relevance.basis = basis
    return card
  }
}

const sumRelevanceScore = card => {
  const {relevance} = card
  relevance.score = reduce(relevance.basis, multiplyRounded, 1)
  return card
}

const sortByScore = ({relevance: ra}, {relevance: rb}) => {
  if (ra.score === rb.score) {
    return 0
  }

  return ra.score < rb.score ? 1 : -1
}

const filterByRelevanceTolerance = state => item => {
  return item.relevance.score >= state.cards.relevanceTolerance
}

export default function(state) {
  const flight = state.flights.current

  return state.cards.collection
    .map(transformToCardWithRelevance)
    .filter(sameValueIfExistFilter('direction', flight.direction))
    .filter(sameValueIfExistFilter('international', flight.international))
    .map(getRelevanceBasis(state))
    .map(sumRelevanceScore)
    .sort(sortByScore)
    .filter(filterByRelevanceTolerance(state))
}
