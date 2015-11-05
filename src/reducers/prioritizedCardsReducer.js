import map from 'lodash/collection/map'
import reduce from 'lodash/collection/reduce'
import merge from 'lodash/object/merge'
import add from 'lodash/math/add'
import sortBy from 'lodash/collection/sortBy'
import moment from 'moment'
import withinTimeAvailable from './emphasis/withinTimeAvailable'

const WALKING_DURATION = 'PT5M'

function samePropertyIfExist(property) {
  return card => !card.meta[property] || card.meta[property] === property
}

function wrapWithRelevance(total, card) {
  total.push({card, relevance: {}})
  return total
}

function withinTime(...durations) {
  const totalDuration = durations.reduce(add, 0)
  return (total, card) => {
    if (moment.duration(card.meta.duration) < moment.duration(totalDuration)) {
      total.push(card)
    }
    return total
  }
}

function getRelevantQuestions(questions) {
  return []
  return questions
    .filter(question => !question.answer)
}

export default function(state) {
  const { collection } = state.cards
  const { toDeparture, direction, international } = state.flights.current

  let cards = collection
    .filter(samePropertyIfExist(direction))
    .filter(samePropertyIfExist(international))
    .push(getRelevantQuestions(state.questions))

  return prioritizedCards
}
