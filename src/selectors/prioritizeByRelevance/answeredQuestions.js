import map from 'lodash/collection/map'

export default (reasons, {meta, state}) => {
  if (!meta.duration) {
    return reasons
  }

  state.cards.questions
    .filter(question => question.answer)
    .map(({name, answer}) => map(answer.emphasis, (relevance, emphasis) => {
      if (emphasis in meta) {
        const sameProperty = emphasis !== name
        reasons.push({
          reason: `${name} = ${answer.value}` + (sameProperty ? ` && ${emphasis}` : ''),
          relevance,
        })
      }
    }))

  return reasons
}
