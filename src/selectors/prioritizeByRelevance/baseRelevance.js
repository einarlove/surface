export default (reasons, { meta }) => {
  if (meta.baseRelevance) {
    reasons.push({
      reason: 'Base relevance',
      relevance: meta.baseRelevance,
    })
  }

  return reasons
}
