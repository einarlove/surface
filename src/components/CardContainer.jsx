import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import styles from 'styles/CardContainer'
import prioritizedCardsReducer from '../reducers/prioritizedCardsReducer'

@connect(state => ({
  prioritized: prioritizedCardsReducer(state),
}))
export default class CardContainer extends Component {
  static propTypes = {
    prioritized: PropTypes.array,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.cardContainer}>
        {this.props.prioritized.map(({card, relevance}, key) => {
          return <Card key={key} {...card} relevance={relevance} />
        })}
      </div>
    )
  }
}
