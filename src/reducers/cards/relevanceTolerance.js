import { SET_RELEVANCE_TOLERANCE, SET_DEFAULT_RELEVANCE_TOLERANCE } from '../../actions/cards'

const defaultRelevance = 0.4

export default function relevanceTolerance(state = defaultRelevance, {type, payload}) {
  switch (type) {

  case SET_RELEVANCE_TOLERANCE:
    console.log(payload)
    return payload.tolerance

  case SET_DEFAULT_RELEVANCE_TOLERANCE:
    return defaultRelevance

  default:
    return state
  }
}
