import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getRelevance } from '../reducers/prioritizedCardsReducer'
import map from 'lodash/collection/map'
import isBoolean from 'lodash/lang/isBoolean'
import omit from 'lodash/object/omit'

import styles from 'styles/RelevancePanelContainer'

@connect(state => ({
  priorities: state.cards.priorities,
}))
export default class RelevancePanelContainer extends Component {
  static propTypes = {
    priorities: PropTypes.object.isRequired,
    meta: PropTypes.object,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
  }

  renderList(value, key) {
    if (isBoolean(value)) {
      return (
        <div key={key} className={styles.singleValue}>
          <span className={styles.singleValueTitle}>{key}</span>
        </div>
      )
    }

    return (
      <div key={key} className={styles.keyValue}>
        <span className={styles.title}>{key}</span>
        <span className={styles.value}>{value}</span>
      </div>
    )
  }

  render() {
    const { children, priorities, meta } = this.props
    // const relevance = getRelevance(priorities, meta)
    // console.log(relevance)
    const { relevant, lessRelevant, irrelevant, ...other } = meta


    return (
      <div className={styles.relevancePanelContainer}>
        {children}

        <div className={styles.relevancePanel}>
          {map(other, this.renderList)}
          {map(relevant, this.renderList)}
          {map(lessRelevant, this.renderList)}
        </div>
      </div>
    )
  }
}
