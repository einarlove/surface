export const SET_EMPHASIS = 'SET_EMPHASIS'
export const EMPHASISE = 'EMPHASISE'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const REMOVE_QUESTION_ANSWER = 'REMOVE_QUESTION_ANSWER'

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
