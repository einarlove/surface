import round from 'lodash/math/round'
import baseRelevance from './baseRelevance'
import location from './location'
import duration from './duration'
import answeredQuestions from './answeredQuestions'

const relevanceReducers = [
  baseRelevance,
  location,
  duration,
  answeredQuestions,
]

const getReasons = factors => {
  return relevanceReducers.reduce((total, reducer) => {
    return reducer(total, factors)
  }, [])
}

const sumRelevance = reasons => {
  return reasons.reduce((total, reason) => {
    return round(total * reason.relevance, 2)
  }, 1)
}

export default factors => {
  const reasons = getReasons(factors)
  return {
    reasons,
    score: sumRelevance(reasons),
  }
}
