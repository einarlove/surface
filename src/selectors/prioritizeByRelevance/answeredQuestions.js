import map from 'lodash/collection/map'

export default (reasons, {meta, state}) => {
  if (!meta.duration) {
    return reasons
  }

  state.cards.questions
    .filter(question => question.answer)
    .map(question => map(question.answer.emphasis, (relevance, emphasis) => {
      if (emphasis in meta) {
        const sameProperty = emphasis !== question.name
        reasons.push({
          reason: `${question.name} = ${question.answer.value}` + (sameProperty ? ` && ${emphasis}` : ''),
          relevance,
        })
      }
    }))

  return reasons
}
