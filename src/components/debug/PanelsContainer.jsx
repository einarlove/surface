import React, { Component, PropTypes } from 'react'
import FlightPanel from './FlightPanel'
import QuestionsPanel from './QuestionsPanel'
import classnames from 'classnames'

import styles from '../../styles/debug/Panels'

export default class PanelsContainer extends Component {
  static propTypes = {
    right: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const className = classnames(styles.container, {
      [styles.rightAligned]: this.props.right,
    })

    return (
      <div className={className}>
        <FlightPanel />
        <QuestionsPanel />
      </div>
    )
  }
}
