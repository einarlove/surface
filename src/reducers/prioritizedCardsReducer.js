import map from 'lodash/collection/map'
import reduce from 'lodash/collection/reduce'
import merge from 'lodash/object/merge'

function getEmphasis(questions) {
  return questions.reduce((total, question) => {
    switch (question.name) {
    case 'children':
      if (question.answer === true) {
        total.children = 1.3
        total.bar = 0.6
      } else if (question.answer === false) {
        total.children = 0
        total.bar = 0.6
      } else {
        total.children = .8
      }
      break
    case 'business':
      total.children = 0
      total.bar = 1.2
      break
    case 'companions':
      total.companions = 1.2
      break
    default:
      break
    }
    return total
  }, {})
}

export function getRelevance(emphasis, meta) {
  const basis = reduce(emphasis, (total, value, key) => {
    if (key in meta) total[key] = value
    return total
  }, {})


  const score = reduce(basis, (total, value) => {
    const newTotal = total * value
    return newTotal
  }, 1)

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
    .reduce((total, emph) => {
      const merged = merge(total, emph, (aa, bb) => (aa || 1) * bb)
      return merged
    }, {})

  return collection
    .filter(({meta}) => !hasAndMismatchProperty('international', meta, flight))
    .filter(({meta}) => !hasAndMismatchProperty('direction', meta, flight))
    .map(card => ({
      card,
      relevance: getRelevance(emphasis, card.meta),
    }))
    .sort((right, left) => {
      if (left.relevance.score < left.relevance.score) {
        return -1
      }
      if (right.relevance.score > left.relevance.score) {
        return 1
      }
      return 0
    })
    .reverse()
}
