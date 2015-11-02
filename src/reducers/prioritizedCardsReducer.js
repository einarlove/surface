import sortBy from 'lodash/collection/sortBy'
import reduce from 'lodash/collection/reduce'
import filter from 'lodash/collection/filter'
import pick from 'lodash/object/pick'
import keys from 'lodash/object/keys'

const RELEVANT = 1
const LESS_RELEVANT = -1
const IRRELEVANT = 'IRRELEVANT'

export function getRelevance(priorities, meta) {
  // let basis = reduce(priorities, (total, value, priority) => {
  //   if (priority === 'direction' && value !== meta[priority]) {
  //     total[priority] = IRRELEVANT
  //   }

  //   if (priority === 'international' && value !== meta[priority]) {
  //     total[priority] = IRRELEVANT
  //   }

  //   return total
  // }, {})

  // basis = reduce(meta.relevant, (total, value, priority) => {
  //   if (priority in priorities && value === priorities[priority]) {
  //     total[priority] = RELEVANT
  //   }
  //   return total
  // }, basis)


  // const score = reduce(basis, (result, value) => result + value, 0)
  // const score = filter(basis, priority => typeof priority === 'number')
  //   .reduce((result, value) => result + value, 0)

  console.log(score, basis)

  return {
    score: score,
    basis: {},
  }
}

function prioritize(priority, value, meta) {
  if (priority in meta) {
    return value === meta[priority] ? 1 : 0
  }

  return 0
}

export default function(state) {
  const { collection, priorities } = state.cards

  return sortBy(collection, ({meta = {}}) => {
    return reduce(priorities, (result, value, priority) => {
      return result + prioritize(priority, value, meta)
    }, 0)
  }).reverse()
}
