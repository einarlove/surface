import questionList from '../../data/questions.json'
import { ANSWER_QUESTION, REMOVE_QUESTION_ANSWER } from '../../actions/cards'

export default function questions(state = questionList, action) {
  switch (action.type) {

  case ANSWER_QUESTION:
    const {name, answer} = action.payload
    return state.map(question => {
      if (question.name === name) {
        return {...question, answer: answer}
      }

      return question
    })

  case REMOVE_QUESTION_ANSWER:
    return state.map(question => {
      if (question.name === action.payload.name) {
        delete question.answer
        return {...question}
      }

      return question
    })

  default:
    return state
  }
}
