import { EMPHASISE, ANSWER_QUESTION, REMOVE_QUESTION_ANSWER } from '../../actions/cards'
import pick from 'lodash/object/pick'
import identity from 'lodash/utility/identity'

const initialEmphasis = {
  children: 0.8,
}

function getValue(property, value, correct, notCorrect) {
  if (value === undefined) {
    return {[property]: initialEmphasis[property]}
  }

  return value === true ? correct : notCorrect
}

function getEmphasis(name, value) {
  switch (name) {
  case 'children':
    return getValue('children', value, {
      children: 1.3,
    }, {
      children: 0,
    }, {

    })
  default: break
  }
}


export default function emphasis(state = initialEmphasis, action) {
  switch (action.type) {

  case ANSWER_QUESTION:
    return {
      ...state,
      ...getEmphasis(action.payload.name, action.payload.answer),
    }

  case REMOVE_QUESTION_ANSWER:
    return {
      ...state,
      ...getEmphasis(action.payload.name),
    }

  case EMPHASISE:
    return pick({...state, ...action.payload}, identity)

  default:
    return state
  }
}
