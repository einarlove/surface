import React, { Component, PropTypes } from 'react'

import RelevanceInformation from '../RelevanceInformation'

import Vertical from './Vertical'
import Horizontal from './Horizontal'
import Question from './Question'

import styles from 'styles/Card'

export default class Card extends Component {
  static propTypes = {
    layout: PropTypes.string,
    debug: PropTypes.bool,
    relevance: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  renderLayout() {
    switch (this.props.layout) {
    case 'question':
      return <Question {...this.props} />
    case 'horizontal':
      return <Horizontal {...this.props} />
    default:
      return <Vertical {...this.props} />
    }
  }

  render() {
    return (
      <div className={styles.card}>
        {this.renderLayout()}

        {this.props.debug && <RelevanceInformation relevance={this.props.relevance} />}
      </div>
    )
  }
}
