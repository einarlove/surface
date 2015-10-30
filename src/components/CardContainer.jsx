import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import prioritizedCardsReducer from '../reducers/prioritizedCardsReducer'
import RelevancePanelContainer from './RelevancePanelContainer'
import Card from './Card'
import styles from 'styles/CardContainer'

@connect(state => ({
  cards: prioritizedCardsReducer(state),
}))
export default class CardContainer extends Component {
  static propTypes = {
    cards: PropTypes.array,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.cardContainer}>
        {this.props.cards.map((card, key) => {
          return (
            <RelevancePanelContainer meta={card.meta} key={key}>
              <Card key={key} {...card} />
            </RelevancePanelContainer>
          )
        })}
      </div>
    )
  }
}
