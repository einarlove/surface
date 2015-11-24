export default ({relevance: ra}, {relevance: rb}) => {
  if (ra.score === rb.score) {
    return 0
  }

  return ra.score < rb.score ? 1 : -1
}
