import React, { Component, PropTypes } from 'react'
import StackedItems from './StackedItems'
import { connect } from 'react-redux'
import sortedCardsByRelevanceReducer from '../reducers/sortedCardsByRelevanceReducer'
import Card from './Card'
import PanelsContainer from './debug/PanelsContainer'

import styles from 'styles/Surface'

@connect(state => ({
  cards: sortedCardsByRelevanceReducer(state),
}))
export default class Surface extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className={styles.surface}>
        <PanelsContainer />
        <StackedItems className={styles.list} items={this.props.cards}>
          {(card, registerHeightUpdate) => (
            <Card
              {...card.item}
              registerHeightUpdate={registerHeightUpdate}
              relevance={card.relevance}
            />
          )}
        </StackedItems>
      </div>
    )
  }
}
