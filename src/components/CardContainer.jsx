import React, { Component } from 'react'
import styles from 'styles/CardContainer'
import facilities from '../data/facilities.json'
import offers from '../data/offers.json'

import Card from './Card'

const cards = [...facilities, ...offers]

export default class CardContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.cardContainer}>
        {cards.map((card, key) => <Card key={key} {...card} />)}
      </div>
    )
  }
}
