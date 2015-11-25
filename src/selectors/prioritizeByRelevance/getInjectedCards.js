import moment from 'moment'
import findWhere from 'lodash/collection/findWhere'
import getTimeAvailable from './getTimeAvailable'
import isUndefined from 'lodash/lang/isUndefined'

const getQuestionCard = state => {
  const {questions} = state.cards
  const timeAvailable = getTimeAvailable(state)
  const unansweredQuestions = questions
    .filter(question => isUndefined(question.answer))
    .filter(question => !question.meta.forDebugging)

  return unansweredQuestions
    .reduce((total, question) => {
      const {meta: {requiredTimeAvailable}, requireAnswered} = question

      if (requireAnswered) {
        const requiredQuestion = findWhere(questions, {name: requireAnswered.name})
        if (requiredQuestion && (!requiredQuestion.answer || requiredQuestion.answer.value !== requireAnswered.value)) {
          return total
        }
      }

      if (requiredTimeAvailable && moment.duration(requiredTimeAvailable) > timeAvailable) {
        return total
      }

      total.push({
        layout: 'question',
        name: question.name,
        title: question.title,
        options: question.options,
        meta: question.meta,
      })

      return total
    }, []).shift()
}

export default state => {
  const injected = []

  const questionCard = getQuestionCard(state)

  if (questionCard) {
    injected.push(questionCard)
  }

  return injected
}

/*
business
  if business question not answered
  if more then 40 minutes to departure
  if not arrival

children
  if business answered
  if children not answered
  if more thne 40 minutes to departure

reisekort
  if destination has travel card
*/
