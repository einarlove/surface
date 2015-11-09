import React, { Component, PropTypes } from 'react'
import map from 'lodash/collection/map'
import size from 'lodash/collection/size'

import styles from 'styles/RelevanceInformation'

export default class RelevanceInformation extends Component {
  static propTypes = {
    relevance: PropTypes.shape({
      score: PropTypes.number.isRequired,
      basis: PropTypes.object.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { score, basis } = this.props.relevance

    return (
      <div className={styles.container}>
        <div className={styles.score}>{score}</div>
        {!!size(basis) &&
          <ul className={styles.basisList}>
            {map(basis, (value, key) => (
              <li key={key} className={styles.basisItem}>
                <span className={styles.basisKey}>{key}</span>
                <span className={styles.basisValue}>{value}</span>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
}
