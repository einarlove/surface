import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import prioritizedCardsReducer from '../reducers/prioritizedCardsReducer'
import PriorityPanel from './PriorityPanel'
import CardContainer from './CardContainer'

@connect(state => ({
  cards: prioritizedCardsReducer(state),
}))
export default class PrioritizePlayground extends Component {
  static propTypes = {
    cards: PropTypes.array,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <PriorityPanel right />
        <div>
          <CardContainer cards={this.props.cards} />
        </div>
      </div>
    )
  }
}
