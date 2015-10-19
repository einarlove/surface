import React, { Component } from 'react'
import styles from 'styles/CardContainer'
import facilities from '../data/facilities.json'
import offers from '../data/offers.json'
import shuffle from 'lodash/collection/shuffle'
import { TransitionMotion, spring } from 'react-motion'
import reduce from 'lodash/collection/reduce'
import map from 'lodash/collection/map'
import find from 'lodash/collection/find'
import first from 'lodash/array/first'
import difference from 'lodash/array/difference'
import uniqueId from 'lodash/utility/uniqueId'
import reject from 'lodash/collection/reject'
import Card from './Card'

const cards = shuffle([...facilities, ...offers]).map(card => {
  card.id = uniqueId('card_')
  return card
})

export default class CardContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [],
    }
  }

  addCard() {
    const newCard = first(difference(cards, this.state.cards))
    if (!newCard) {return false}
    this.setState({
      cards: [newCard, ...this.state.cards],
    })
  }

  cardWillEnter(id) {
    return {
      transition: spring(0),
      card: find(cards, {id}),
    }
  }

  cardWillLeave(id, transition) {
    return {
      transition: spring(0),
      card: transition.card,
    }
  }

  removeCard(id) {
    this.setState({
      cards: reject([...this.state.cards], {id}),
    })
  }

  getStyles() {
    return reduce(this.state.cards, (result, card) => {
      result[card.id] = {
        transition: spring(1, [200, 25]),
        card,
      }
      return result
    }, {})
  }

  render() {
    return (
      <div className={styles.cardContainer}>
        <button onClick={::this.addCard}>Legg til kort</button>
        <TransitionMotion
          styles={this.getStyles()}
          willEnter={::this.cardWillEnter}
          willLeave={::this.cardWillLeave}
        >
          { transitions => (
            <div>
              { map(transitions, ({transition, card}) => {
                return (
                  <Card
                    key={card.id}
                    transition={transition}
                    removeSelf={this.removeCard.bind(this, card.id)}
                    {...card}
                  />
                )
              })}
            </div>
            )
          }
        </TransitionMotion>
      </div>
    )
  }
}
