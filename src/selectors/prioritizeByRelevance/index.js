import filterIrrelevant from './filterIrrelevant'
import getTimeAvailable from './getTimeAvailable'
import getRelevance from './getRelevance'
import sortByRelevance from './sortByRelevance'
import getInjectedCards from './getInjectedCards'

const addRelevance = state => {
  const timeAvailable = getTimeAvailable(state)

  return item => ({
    item,
    relevance: getRelevance({
      timeAvailable,
      state,
      meta: item.meta,
    }),
  })
}

const filterByRelevanceTolerance = state => ({relevance}) => {
  return relevance.score >= state.cards.relevanceTolerance
}

export default function(state) {
  return state.cards.collection
    .concat(getInjectedCards(state))
    .filter(filterIrrelevant(state))
    .map(addRelevance(state))
    .sort(sortByRelevance)
    .filter(filterByRelevanceTolerance(state))
}
