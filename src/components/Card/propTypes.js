import { PropTypes } from 'react'

export default {
  title: PropTypes.string,
  description: PropTypes.string,
  layout: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }),
  cover: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }),
  relevance: PropTypes.object.isRequired,
  debug: PropTypes.bool,
}
