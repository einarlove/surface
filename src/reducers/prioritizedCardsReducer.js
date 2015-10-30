import sortBy from 'lodash/collection/sortBy'
import reduce from 'lodash/collection/reduce'
import filter from 'lodash/collection/filter'
import pick from 'lodash/object/pick'

export function getRelevance(priorities, meta) {
  const positive = pick(priorities, (value, priority) => {
    return value === meta[priority]
  })

  return {
    score: 0,
    basis: {
      positive: [],
      negative: [],
      irellevant: [],
    }
  }
}

function getPriorityScoreFromMeta(priorities, meta) {
  return priorities.reduce((result, value, priority) => {
    return result
  }, 0)
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
