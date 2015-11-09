export const SET_EMPHASIS = 'SET_EMPHASIS'
export const EMPHASISE = 'EMPHASISE'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const REMOVE_QUESTION_ANSWER = 'REMOVE_QUESTION_ANSWER'
export const SET_RELEVANCE_TOLERANCE = 'SET_RELEVANCE_TOLERANCE'
export const SET_DEFAULT_RELEVANCE_TOLERANCE = 'SET_DEFAULT_RELEVANCE_TOLERANCE'

export function setEmphasis(payload) {
  return { type: SET_EMPHASIS, payload}
}

export function emphasise(payload) {
  return { type: EMPHASISE, payload}
}

export function answerQuestion(name, answer) {
  return { type: ANSWER_QUESTION, payload: {name, answer}}
}

export function removeQuestionAnswer(name) {
  return { type: REMOVE_QUESTION_ANSWER, payload: {name}}
}

export function setDefaultRelevanceTolerance() {
  return { type: SET_DEFAULT_RELEVANCE_TOLERANCE }
}

export function setRelevanceTolerance(tolerance) {
  return { type: SET_RELEVANCE_TOLERANCE, payload: {tolerance}}
}
