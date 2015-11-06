import React, { Component, PropTypes } from 'react'
import StackedItems from './StackedItems'
import { connect } from 'react-redux'
import sortedCardsByRelevanceReducer from '../reducers/sortedCardsByRelevanceReducer'

import Card from './Card'

// import 'styles/Surface'

@connect(state => ({
  cards: sortedCardsByRelevanceReducer(state),
}))
export default class Surface extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
  }

  render() {
    return (
      <StackedItems items={this.props.cards}>
        {(card, registerHeight) => (
          <Card
            {...card.item}
            registerHeight={registerHeight}
          />
        )}
      </StackedItems>
    )
  }
}
