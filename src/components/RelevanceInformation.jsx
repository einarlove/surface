import React, { Component, PropTypes } from 'react'
import size from 'lodash/collection/size'

import styles from 'styles/RelevanceInformation'

export default class RelevanceInformation extends Component {
  static propTypes = {
    relevance: PropTypes.shape({
      score: PropTypes.number.isRequired,
      reasons: PropTypes.array.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { score, reasons } = this.props.relevance

    return (
      <div className={styles.container}>
        <div className={styles.score}>{score}</div>
        {!!size(reasons) &&
          <ul className={styles.reasonsList}>
            {reasons.map(({relevance, reason}, key) => (
              <li key={key} className={styles.reasonItem}>
              <span className={styles.reasonScore}>{relevance}</span>
              <span className={styles.reasonLabel}>{reason}</span>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}
