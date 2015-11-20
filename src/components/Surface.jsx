import React, { Component, PropTypes } from 'react'
import StackedItems from './StackedItems'
import { connect } from 'react-redux'
import sortedCardsByRelevanceReducer from '../reducers/sortedCardsByRelevanceReducer'
import Card from './Card'
import PanelsContainer from './debug/PanelsContainer'

import styles from 'styles/Surface'

@connect(state => ({
  cards: sortedCardsByRelevanceReducer(state),
  debug: state.debug,
}))
export default class Surface extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    debug: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.toggleDebug = ::this.onToggleDebug
  }

  componentDidMount() {
    window.addEventListener('keydown', this.toggleDebug)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.toggleDebug)
  }

  onToggleDebug({keyCode}) {
    if (keyCode === 81) {
      this.props.dispatch({type: 'TOGGLE_DEBUG'})
    }
  }

  render() {
    return (
      <div className={styles.surface}>
        {this.props.debug && <PanelsContainer />}
        <StackedItems className={styles.list} items={this.props.cards}>
          {(card, registerHeightUpdate) => (
            <Card
              {...card.item}
              registerHeightUpdate={registerHeightUpdate}
              relevance={card.relevance}
              debug={this.props.debug}
            />
          )}
        </StackedItems>
      </div>
    )
  }
}
