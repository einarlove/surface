import map from 'lodash/collection/map'
import reduce from 'lodash/collection/reduce'

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
  const { collection, emphasis, questions } = state.cards
  const flight = state.flights.current

  // const emphasis = getEmphasis(questions)
  console.log(emphasis)

  return collection
    .filter(({meta}) => !hasAndMismatchProperty('international', meta, flight))
    .filter(({meta}) => !hasAndMismatchProperty('direction', meta, flight))
    .map(card => ({
      card,
      relevance: getRelevance(emphasis, card.meta)
    }))
}

// export default function(state) {
//   const { collection, priorities } = state.cards

//   return sortBy(collection, ({meta = {}}) => {
//     return reduce(priorities, (result, value, priority) => {
//       return result + prioritize(priority, value, meta)
//     }, 0)
//   }).reverse()
// }
